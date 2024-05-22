const { Message } = require("./chatroomDB");
const User = require("../User/userModel");
const express = require("express");
const { ObjectId } = require("mongodb");
const { ChromeLauncher } = require("puppeteer");
const chatRouter = express.Router();
const middleware = require("../middleware");

chatRouter.post("/addUser", middleware.authenticate, async (req, res) => {
  // const { firstName, lastName, email, profile_pic } = req.body;
  // try {
  //   const newUser = new User({
  //     firstName,
  //     lastName,
  //     email,
  //     password: "1234",
  //     profile_pic,
  //   });
  //   await newUser.save();
  //   res.json(newUser);
  // } catch (error) {
  //   console.log("Error:" + error);
  // }
});

chatRouter.get("/allUsers", middleware.authenticate, async (req, res) => {
  const users = await User.find();
  res.json({ id: users.map((user) => user._id) });
});

chatRouter.get(
  "/one-user/:userId/:id",
  middleware.authenticate,
  async (req, res) => {
    try {
      const user = await User.findById({ _id: req.params.id });
      res.json({
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        profile_pic: user.profile_pic,
        bio: user.bio,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        error,
      });
    }
  }
);

chatRouter.get("/:userId", middleware.authenticate, async (req, res) => {
  const userId = req.params.userId;

  try {
    // Find distinct receiverIds where the current user is the sender
    const receiverIdsSentByUser = await Message.distinct("receiverId", {
      senderId: userId,
    });

    // Find distinct senderIds where the current user is the receiver
    const senderIdsReceivedByUser = await Message.distinct("senderId", {
      receiverId: userId,
    });

    // Merge arrays and convert them to unique strings, then convert back to ObjectIds
    const uniqueChatParticipantIds = Array.from(
      new Set([
        ...receiverIdsSentByUser.map((id) => id.toString()),
        ...senderIdsReceivedByUser.map((id) => id.toString()),
      ])
    ).map((id) => new ObjectId(id));

    console.log(uniqueChatParticipantIds);

    // Find last message for each participant
    const lastMessages = await Promise.all(
      uniqueChatParticipantIds.map(async (participantId) => {
        const lastMessage = await Message.findOne({
          $or: [
            { senderId: userId, receiverId: participantId },
            { senderId: participantId, receiverId: userId },
          ],
        })
          .sort({ timestamp: -1 })
          .limit(1);
        return { participantId, lastMessage };
      })
    );

    // Retrieve user details for each participant
    const usersWithLastMessages = await Promise.all(
      lastMessages.map(async (item) => {
        const user = await User.findById(item.participantId);
        return {
          chatUser: {
            id: user._id,
            firstname: user.firstname,
            lastname: user.lastname,
            email: user.email,
            profile_pic: user.profile_pic,
            bio: user.bio,
          },
          lastMessage: item.lastMessage.content,
          lastMsgTime: item.lastMessage.timestamp,
        };
      })
    );

    // Sort the results by lastMsgTime
    const sortedData = usersWithLastMessages.sort(
      (a, b) => b.lastMsgTime - a.lastMsgTime
    );

    res.json(sortedData);
  } catch (error) {
    res.status(500).json({
      error,
    });
  }
});

chatRouter.post("/current-chat", middleware.authenticate, async (req, res) => {
  const { currentChatId, loggedInUserId } = req.body;
  const currentChatMessages = await Message.find({
    $or: [
      { senderId: loggedInUserId, receiverId: currentChatId },
      { senderId: currentChatId, receiverId: loggedInUserId },
    ],
  }).sort({ timestamp: 1 });
  res.json(
    currentChatMessages.map((current) => ({
      senderId: current.senderId,
      receiverId: current.receiverId,
      content: current.content,
      timestamp: current.timestamp,
    }))
  );
});

//Send a message to an user
chatRouter.post("/", middleware.authenticate, async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  const sender = new ObjectId(senderId);
  const receiver = new ObjectId(receiverId);
  try {
    const sentMessage = new Message({
      senderId: sender,
      receiverId: receiver,
      content,
    });
    await sentMessage.save();
    res.json(sentMessage);
  } catch (error) {
    console.log("Error:" + error);
  }
});

//Delete an user
chatRouter.delete("/delete", async (req, res) => {
  const { content } = req.body;
  try {
    await Message.deleteMany({ content });
    // {
    //   $or: [{ senderId: id }, { receiverId: id }],
    // }
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = chatRouter;
