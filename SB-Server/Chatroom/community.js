const { User, Community, CommunityMsg } = require("./chatroomDB");
const express = require("express");
const { ObjectId } = require("mongodb");
const communityRouter = express.Router();

communityRouter.post("/create", async (req, res) => {
  const { name, description, members, createdBy, image } = req.body;

  try {
    const newCommunity = await Community.create({
      name,
      description,
      members,
      createdBy,
      image,
    });
    console.log(newCommunity);
    const communityWithmembers = await Community.find({
      _id: newCommunity._id,
    })
      .populate("members", "firstName lastName email profile_pic")
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

communityRouter.put("/join", async (req, res) => {
  const { user, community } = req.body;
  try {
    const updatedCommunity = await Community.findByIdAndUpdate(
      new ObjectId(community),
      { $push: { members: new ObjectId(user) } },
      { new: true }
    );
    console.log(updatedCommunity);
    res.json({ message: "User joined.", updatedCommunity });
  } catch (error) {
    res.status(405).json(error);
  }
});

communityRouter.put("/leave", async (req, res) => {
  const { user, community } = req.body;
  try {
    const updatedCommunity = await Community.findByIdAndUpdate(
      community,
      { $pull: { members: user } },
      { new: true }
    );
    console.log(updatedCommunity);
    res.json({ message: "User left.", updatedCommunity });
  } catch (error) {
    res.status(405).json(error);
  }
});

communityRouter.get("/user-communities/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const communities = await Community.find({
      members: new ObjectId(userId),
    })
      .populate("members", "firstName lastName email profile_pic")
      .exec();

    console.log(communities);

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

    console.log(sortedCommunities);

    res.json(sortedCommunities);
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
});

communityRouter.get("/searchCommunity/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const community = await Community.find({
      _id: new ObjectId(id),
    })
      .populate("members", "firstName lastName email profile_pic")
      .exec();
    res.json(community);
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
});

communityRouter.get("/all-communities", async (req, res) => {
  const communities = await Community.find();
  res.json({
    response: communities.map((community) => {
      return { members: community.members, _id: community._id };
    }),
  });
});

communityRouter.post("/send-message", async (req, res) => {
  const { sender, content, community } = req.body;
  try {
    const newMessage = await CommunityMsg.create({
      content: content,
      sender: new ObjectId(sender),
      community: new ObjectId(community),
      createdAt: Date.now(),
    });
    res.json(newMessage);
  } catch (error) {
    res.status(400).json({
      message: "Error!",
    });
  }
});

communityRouter.get("/messages/:id", async (req, res) => {
  const community = new ObjectId(req.params.id);

  try {
    const messages = await CommunityMsg.find({ community });
    res.json(messages);
  } catch (error) {
    res.status(404).json({ error: error });
  }
});

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
