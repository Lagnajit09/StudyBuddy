const { User, Message } = require("../db");
const express = require("express");
const { ObjectId } = require("mongodb");
const chatRouter = express.Router();

chatRouter.get("/:id", async (req, res) => {
  const sender = req.params.id;
  const senderId = new ObjectId(sender);
  const receiverIds = await Message.distinct("receiverId", { senderId });

  // Find last message for each receiverId
  const lastMessages = await Promise.all(
    receiverIds.map(async (receiverId) => {
      const lastMessage = await Message.findOne({
        senderId,
        receiverId,
      })
        .sort({ timestamp: -1 })
        .limit(1);
      return { receiverId, lastMessage };
    })
  );

  // Retrieve user details for each receiverId
  const usersWithLastMessages = await Promise.all(
    lastMessages.map(async (item) => {
      const user = await User.findById(item.receiverId);
      return {
        chatUser: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          profile_pic: user.profile_pic,
        },
        lastMessage: item.lastMessage.content,
        lastMsgTime: item.lastMessage.timestamp,
      };
    })
  );

  const sortedData = usersWithLastMessages.sort(
    (a, b) => b.lastMsgTime - a.lastMsgTime
  );

  res.json({ sortedData });
});

chatRouter.post("/current-chat", async (req, res) => {
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

chatRouter.post("/", async (req, res) => {
  const { senderId, receiverId, content } = req.body;
  const sender = new ObjectId(senderId);
  const receiver = new ObjectId(receiverId);
  try {
    const sentMessage = await new Message({
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

chatRouter.delete("/delete", async (req, res) => {
  const { content } = req.body;
  try {
    await Message.deleteMany({ content });
    res.json({ message: "Deleted successfully!" });
  } catch (error) {
    res.json({ error });
  }
});

module.exports = chatRouter;
