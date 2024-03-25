const { User, Message } = require("../db");
const mongoose = require("mongoose");
const express = require("express");
const { ObjectId } = require("mongodb");
const chatRouter = express.Router();

chatRouter.get("/", async (req, res) => {
  const senderId = new ObjectId("660128e020c0f0ac18fda708");
  const receiverIds = await Message.distinct("receiverId", { senderId });
  const chatUsers = await User.find({ _id: { $in: receiverIds } });
  const messages = await Message.find({
    $or: [
      { senderId, receiverId: { $in: receiverIds } },
      { senderId: { $in: receiverIds }, receiverId: senderId },
    ],
  }).sort({ timestamp: 1 });

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
      console.log(user.profile_pic);
      return {
        chatUser: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          profile_pic: user.profile_pic,
        },
        lastMessage: item.lastMessage.content,
      };
    })
  );

  const chatMessages = messages.map((message) => ({
    senderId: message.senderId,
    receiverId: message.receiverId,
    message: message.content,
  }));

  res.json({ usersWithLastMessages, chatMessages });
});

chatRouter.post("/", async (req, res) => {
  const { sender, receiver, content } = req.body;
  const senderId = new ObjectId(sender);
  const receiverId = new ObjectId(receiver);
  try {
    const sentMessage = await new Message({
      senderId,
      receiverId,
      content,
    });
    await sentMessage.save();
    res.json(sentMessage);
  } catch (error) {
    console.log("Error:" + error);
  }
});

chatRouter.get("/last-messages", async (req, res) => {
  const senderId = new ObjectId("660128e020c0f0ac18fda708"); // User A's ObjectId

  try {
    // Find distinct receiverIds for the given senderId
    const receiverIds = await Message.distinct("receiverId", {
      senderId,
    });

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
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
          },
          lastMessage: item.lastMessage.content,
        };
      })
    );

    res.json(usersWithLastMessages);
  } catch (error) {
    // Handle error
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = chatRouter;
