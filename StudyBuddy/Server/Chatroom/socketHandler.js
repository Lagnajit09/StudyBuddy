const userSocketMap = new Map();
const communitySocketMap = new Map();

const handleSocketConnection = (io) => {
  io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("userId", ({ userId, joinedCommunities }) => {
      userSocketMap.set(userId, socket.id);
      // Update communitySocketMap with the communities the user has joined
      joinedCommunities.forEach((community) => {
        if (!communitySocketMap.has(community._id)) {
          communitySocketMap.set(community._id, []);
        }
        const socketIds = communitySocketMap.get(community._id);
        community.members.forEach((member) => {
          const sId = userSocketMap.get(member._id);
          if (sId && !socketIds.includes(sId)) {
            communitySocketMap.get(community._id).push(sId);
          }
        });
      });

      // console.log(userSocketMap);
      // console.log(communitySocketMap);
    });

    // Handle incoming messages
    socket.on("message", ({ data }) => {
      console.log("Received message:", data);
      const receiverSocket = userSocketMap.get(data.receiverId);
      const senderSocket = userSocketMap.get(data.senderId);
      // send the message to the receiver's socket
      io.to(senderSocket).emit("message", data);
      if (receiverSocket) {
        io.to(receiverSocket).emit("message", data);
      }
    });

    // Handle user joining community
    socket.on("joinCommunity", ({ user, communityId }) => {
      console.log(`User ${user.firstname} joined community ${communityId}`);
      console.log(userSocketMap);
      // Add the user's socketId to the community's array
      const socketId = userSocketMap.get(user._id);
      console.log(socketId);
      if (socketId) {
        if (!communitySocketMap.has(communityId)) {
          console.log("first");
          communitySocketMap.set(communityId, []);
        }
        communitySocketMap.get(communityId).push(socketId);
        console.log(communitySocketMap.get(communityId));
      }
    });

    // Handle user leaving community
    socket.on("leaveCommunity", ({ user, communityId }) => {
      console.log(`User ${user.firstname} left community ${communityId}`);
      // Remove the user's socketId from the community's array
      const socketIds = communitySocketMap.get(communityId);
      console.log(socketIds);
      if (socketIds) {
        const socketId = userSocketMap.get(user._id);
        console.log(socketId);
        const index = socketIds.indexOf(socketId);
        console.log(index);
        if (index !== -1) {
          socketIds.splice(index, 1);
          console.log(socketIds);

          socketIds.forEach((socket) => {
            console.log("Sending leave to:" + socket);
            io.to(socket).emit("communityUpdate", {
              user,
              communityId,
              action: "leave",
            });
          });
        }
      }
    });

    socket.on("userJoinedCommunity", ({ user, communityId }) => {
      console.log(`User ${user.firstname} joined community ${communityId}`);
      const socketIds = communitySocketMap.get(communityId);
      const userSocket = userSocketMap.get(user._id);
      console.log(socketIds);
      if (socketIds) {
        const otherSockets = socketIds.filter(
          (socket) => socket !== userSocket
        );
        otherSockets.forEach((socketId) => {
          io.to(socketId).emit("communityUpdate", {
            user,
            communityId,
            action: "join",
          });
        });
      }
    });

    // Handle incoming community messages
    socket.on("community:message", (data) => {
      console.log("Received community message:", data);

      const communitySockets = communitySocketMap.get(data.data.community);

      console.log("receivers: " + communitySockets);

      communitySockets.forEach((socket) => {
        // Broadcast the message to all connected clients
        io.to(socket).emit("community:message", data);
      });
    });

    socket.on("updateChatUsers", ({ recipientId, senderId }) => {
      const recipientSocketId = userSocketMap.get(recipientId);
      const senderSocketId = userSocketMap.get(senderId);
      io.to(senderSocketId).emit("chatUsersUpdated", recipientId);
      if (recipientSocketId) {
        // Notify recipient to update chat users list
        io.to(recipientSocketId).emit("chatUsersUpdated", senderId);
      }
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      console.log("User disconnected");
      // Remove user's socket from userSocketMap
      for (let [userId, socketId] of userSocketMap.entries()) {
        if (socketId === socket.id) {
          userSocketMap.delete(userId);
          break;
        }
      }
      // Remove user's socket from communitySocketMap
      for (let [communityId, sockets] of communitySocketMap.entries()) {
        console.log(sockets);
        if (sockets.includes(socket.id)) {
          const index = sockets.indexOf(socket.id);
          sockets.splice(index, 1);
          break;
        }
      }
    });
  });
};

module.exports = { handleSocketConnection };
