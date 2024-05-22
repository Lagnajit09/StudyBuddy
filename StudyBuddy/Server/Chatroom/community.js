const { Community, CommunityMsg } = require("./chatroomDB");
const { User } = require("../User/userModel");
const express = require("express");
const { ObjectId } = require("mongodb");
const communityRouter = express.Router();
const middleware = require("../middleware");

communityRouter.post("/create", middleware.authenticate, async (req, res) => {
  const { userId, name, description, members, createdBy, image } = req.body;

  try {
    const newCommunity = await Community.create({
      name,
      description,
      members,
      createdBy,
      image,
    });
    const communityWithmembers = await Community.find({
      _id: newCommunity._id,
    })
      .populate("members", "firstname lastname email profile_pic")
      .exec();

    res.json({
      message: "New community created successfully!",
      communityWithmembers,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error ceating new community: ",
      err,
    });
  }
});

communityRouter.put("/join", middleware.authenticate, async (req, res) => {
  const { userId, community } = req.body;
  try {
    const updatedCommunity = await Community.findByIdAndUpdate(
      new ObjectId(community),
      { $push: { members: new ObjectId(userId) } },
      { new: true }
    );
    res.json({ message: "User joined.", updatedCommunity });
  } catch (error) {
    res.status(405).json(error);
  }
});

communityRouter.put("/leave", middleware.authenticate, async (req, res) => {
  const { userId, community } = req.body;
  try {
    const updatedCommunity = await Community.findByIdAndUpdate(
      community,
      { $pull: { members: userId } },
      { new: true }
    );
    res.json({ message: "User left.", updatedCommunity });
  } catch (error) {
    res.status(405).json(error);
  }
});

communityRouter.get(
  "/user-communities/:userId",
  middleware.authenticate,
  async (req, res) => {
    const userId = req.params.userId;
    try {
      const communities = await Community.find({
        members: new ObjectId(userId),
      })
        .populate("members", "firstname lastname email profile_pic bio")
        .exec();

      // Fetch the last message and its time for each community
      const communitiesWithLastMessage = await Promise.all(
        communities.map(async (community) => {
          const lastMessage = await CommunityMsg.findOne({
            community: community._id,
          })
            .sort({ createdAt: -1 })
            .limit(1);

          return {
            ...community.toObject(),
            lastMessage: lastMessage ? lastMessage.content : null,
            lastMsgTime: lastMessage ? lastMessage.createdAt : null,
          };
        })
      );

      // Sort communities by lastMsgTime
      const sortedCommunities = communitiesWithLastMessage.sort(
        (a, b) => (b.lastMsgTime || 0) - (a.lastMsgTime || 0)
      );

      res.json(sortedCommunities);
    } catch (error) {
      res.status(400).json({
        error,
      });
    }
  }
);

communityRouter.get(
  "/searchCommunity/:userId/:id",
  middleware.authenticate,
  async (req, res) => {
    const id = req.params.id;
    try {
      const community = await Community.find({
        _id: new ObjectId(id),
      })
        .populate("members", "firstname lastname email profile_pic bio")
        .exec();
      res.json(community);
    } catch (error) {
      res.status(400).json({
        error,
      });
    }
  }
);

communityRouter.get(
  "/all-communities/:userId",
  middleware.authenticate,
  async (req, res) => {
    const communities = await Community.find();
    res.json({
      response: communities.map((community) => {
        return { members: community.members, _id: community._id };
      }),
    });
  }
);

communityRouter.post(
  "/send-message",
  middleware.authenticate,
  async (req, res) => {
    const { userId, sender, content, community, adminMsg } = req.body;
    console.log(sender);
    try {
      const newMessage = await CommunityMsg.create({
        content: content,
        sender: new ObjectId(sender),
        community: new ObjectId(community),
        adminMsg: adminMsg || false,
        createdAt: Date.now(),
      });
      res.json(newMessage);
    } catch (error) {
      console.log(error);
      res.status(400).json({
        message: "Error!" + error,
      });
    }
  }
);

communityRouter.get(
  "/messages/:userId/:id",
  middleware.authenticate,
  async (req, res) => {
    const community = new ObjectId(req.params.id);

    try {
      const messages = await CommunityMsg.find({ community });
      res.json(messages);
    } catch (error) {
      res.status(404).json({ error: error });
    }
  }
);

communityRouter.delete("/delete-msg", async (req, res) => {
  const { content } = req.body;
  try {
    await CommunityMsg.deleteMany({ content });

    res.json({ message: "Deleted successfully!" });
  } catch (err) {
    res.status(405).json({ err });
  }
});

module.exports = communityRouter;
