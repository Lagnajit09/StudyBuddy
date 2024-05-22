const { User, Community, CommunityMsg } = require("../db");
const express = require("express");
const { ObjectId } = require("mongodb");
const communityRouter = express.Router();

const communityMessages = [
  {
    content: "Hey everyone!",
    sender: "660128e020c0f0ac18fda708",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-07-20T04:00:44.333Z",
  },
  {
    content: "Just finished my coding assignment. Feeling accomplished!",
    sender: "660128e020c0f0ac18fda708",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-07-20T04:00:44.333Z",
  },
  {
    content: "Does anyone have tips for acing the upcoming math exam?",
    sender: "66127a877fa6cdaaf46ca855",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-07-20T04:10:00.000Z",
  },
  {
    content:
      "Struggling with understanding quantum mechanics. Any resources or study tips?",
    sender: "66127a937fa6cdaaf46ca857",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-07-20T04:20:00.000Z",
  },
  {
    content:
      "Started reading 'Introduction to Machine Learning.' Any fellow enthusiasts here?",
    sender: "66127ade7fa6cdaaf46ca861",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-07-20T04:30:00.000Z",
  },
  {
    content:
      "Just joined the community! Excited to dive into some deep learning discussions.",
    sender: "66127a9e7fa6cdaaf46ca859",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-07-20T04:40:00.000Z",
  },
  {
    content: "Any tips for mastering JavaScript?",
    sender: "66127b307fa6cdaaf46ca865",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-07-20T04:50:00.000Z",
  },
  {
    content:
      "Just finished reviewing my data structures notes. Time for some practice!",
    sender: "660128e020c0f0ac18fda708",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-07-20T05:00:00.000Z",
  },
  {
    content: "Working on a new coding project. Anyone interested in joining?",
    sender: "66127a877fa6cdaaf46ca855",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-07-20T05:10:00.000Z",
  },
  {
    content:
      "Looking for recommendations on resources for learning algorithms.",
    sender: "66127a937fa6cdaaf46ca857",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-07-20T05:20:00.000Z",
  },
  {
    content:
      "Just finished my first coding bootcamp. Feeling excited to apply my skills!",
    sender: "66127ade7fa6cdaaf46ca861",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-07-20T05:30:00.000Z",
  },
  {
    content: "Anyone else participating in the upcoming hackathon?",
    sender: "66127a9e7fa6cdaaf46ca859",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-07-20T05:40:00.000Z",
  },
  {
    content: "Completed my first coding challenge today. Feeling proud!",
    sender: "66127b307fa6cdaaf46ca865",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-07-20T05:50:00.000Z",
  },
  {
    content:
      "Just finished implementing a neural network for image classification. Exciting stuff!",
    sender: "66127a937fa6cdaaf46ca857",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-04-08T12:53:44.333Z",
  },
  {
    content:
      "Exploring natural language processing techniques. Anyone interested in collaborating?",
    sender: "660128e020c0f0ac18fda708",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-04-08T12:54:44.333Z",
  },
  {
    content:
      "Studying reinforcement learning algorithms. Any tips on understanding Q-learning?",
    sender: "66127b927fa6cdaaf46ca86f",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-04-08T12:55:44.333Z",
  },
  {
    content:
      "Attended a workshop on generative adversarial networks. Mind-blowing concepts!",
    sender: "66127bba7fa6cdaaf46ca875",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-04-08T12:56:44.333Z",
  },
  {
    content:
      "Looking for resources on computer vision applications. Any recommendations?",
    sender: "66127b9e7fa6cdaaf46ca871",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-04-08T12:57:44.333Z",
  },
  {
    content:
      "Just completed a course on deep reinforcement learning. Ready for some hands-on projects!",
    sender: "66127b3d7fa6cdaaf46ca867",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-04-08T12:58:44.333Z",
  },
  {
    content:
      "Exploring the latest advancements in machine learning. The field is evolving so rapidly!",
    sender: "661188549168c35d8524526b",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-04-08T12:59:44.333Z",
  },
  {
    content:
      "Just joined AI Explorers! Excited to learn and grow with this community.",
    sender: "66127a877fa6cdaaf46ca855",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-04-08T13:00:44.333Z",
  },
  {
    content:
      "Brushing up on my linear algebra skills. Can't wait to apply them to machine learning models!",
    sender: "66127a6d7fa6cdaaf46ca853",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-04-08T13:01:44.333Z",
  },
  {
    content:
      "Experimenting with different activation functions in neural networks. ReLU seems to be performing well!",
    sender: "66127a937fa6cdaaf46ca857",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-04-08T13:02:44.333Z",
  },
  {
    content:
      "Completed a project on sentiment analysis using LSTM networks. Results are promising!",
    sender: "660128e020c0f0ac18fda708",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-04-08T13:03:44.333Z",
  },
  {
    content:
      "Studying attention mechanisms in transformer models. Fascinating how they improve model performance!",
    sender: "66127b927fa6cdaaf46ca86f",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-04-08T13:04:44.333Z",
  },
  {
    content:
      "Looking for datasets to train my image recognition model. Any recommendations?",
    sender: "66127bba7fa6cdaaf46ca875",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-04-08T13:05:44.333Z",
  },
  {
    content:
      "Just attended a webinar on reinforcement learning applications in robotics. Mind-blowing stuff!",
    sender: "66127b9e7fa6cdaaf46ca871",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-04-08T13:06:44.333Z",
  },
  {
    content: "Hey Pythonistas! Anyone working on a cool project?",
    sender: "66012a2620c0f0ac18fda70a",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:15:44.333Z",
  },
  {
    content: "I'm diving into Django this week. Any tips?",
    sender: "66127ab77fa6cdaaf46ca85d",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:17:00.000Z",
  },
  {
    content: "Just finished a Python script for data analysis. Feels great!",
    sender: "66127ad17fa6cdaaf46ca85f",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:19:00.000Z",
  },
  {
    content: "Looking for Python job opportunities. Any leads?",
    sender: "66127b267fa6cdaaf46ca863",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:21:00.000Z",
  },
  {
    content:
      "Just discovered a new Python library for machine learning. Excited to explore!",
    sender: "66127b757fa6cdaaf46ca86b",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:23:00.000Z",
  },
  {
    content: "Struggling with Python loops. Any good tutorials?",
    sender: "66127baa7fa6cdaaf46ca873",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:25:00.000Z",
  },
  {
    content: "Just completed a Python coding challenge. Feeling accomplished!",
    sender: "66012a2620c0f0ac18fda70a",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:27:00.000Z",
  },
  {
    content: "Working on optimizing my Python code for better performance.",
    sender: "66127ab77fa6cdaaf46ca85d",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:29:00.000Z",
  },
  {
    content: "Anyone else exploring Python web frameworks?",
    sender: "66127ad17fa6cdaaf46ca85f",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:31:00.000Z",
  },
  {
    content: "Just started learning Python. Excited for the journey ahead!",
    sender: "66127b267fa6cdaaf46ca863",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:33:00.000Z",
  },
  {
    content: "Looking for a Python mentor. Any volunteers?",
    sender: "66127b757fa6cdaaf46ca86b",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:35:00.000Z",
  },
  {
    content: "Just attended a Python workshop. Learned a lot!",
    sender: "66127baa7fa6cdaaf46ca873",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:37:00.000Z",
  },
  {
    content: "Python is such a versatile language. So many possibilities!",
    sender: "66012a2620c0f0ac18fda70a",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:39:00.000Z",
  },
  {
    content: "Anyone using Python for data science projects?",
    sender: "66127ab77fa6cdaaf46ca85d",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:41:00.000Z",
  },
  {
    content: "Just started a Python study group. DM me if interested!",
    sender: "66127ad17fa6cdaaf46ca85f",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:43:00.000Z",
  },
  {
    content: "Looking for Python programming buddies. Let's learn together!",
    sender: "66127b267fa6cdaaf46ca863",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:45:00.000Z",
  },
  {
    content:
      "Just discovered a Python library for natural language processing. Excited to try it out!",
    sender: "66127b757fa6cdaaf46ca86b",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:47:00.000Z",
  },
  {
    content: "Python is my favorite programming language!",
    sender: "66127baa7fa6cdaaf46ca873",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:49:00.000Z",
  },
  {
    content: "Just completed a Python course on Coursera. Highly recommend it!",
    sender: "66012a2620c0f0ac18fda70a",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:51:00.000Z",
  },
  {
    content: "Learning Python has been a game-changer for my career!",
    sender: "66127ab77fa6cdaaf46ca85d",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:53:00.000Z",
  },
  {
    content: "Just built my first Python web app. Feeling proud!",
    sender: "66127ad17fa6cdaaf46ca85f",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-05-09T10:55:00.000Z",
  },
  {
    content: "Just solved a challenging physics problem!",
    sender: "66127b3d7fa6cdaaf46ca867",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-05-20T08:30:44.333Z",
  },
  {
    content: "Does anyone need help with their physics homework?",
    sender: "66127b867fa6cdaaf46ca86d",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-05-20T08:35:00.000Z",
  },
  {
    content: "I'm studying quantum mechanics. Anyone else interested?",
    sender: "66127b757fa6cdaaf46ca86b",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-05-20T08:40:00.000Z",
  },
  {
    content:
      "Just finished watching a physics documentary. Highly recommend it!",
    sender: "66127bd87fa6cdaaf46ca879",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-05-20T08:45:00.000Z",
  },
  {
    content: "Studying for the physics exam next week. Wish me luck!",
    sender: "66127baa7fa6cdaaf46ca873",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-05-20T08:50:00.000Z",
  },
  {
    content:
      "Just joined the Physics Pioneers community! Excited to learn and discuss physics.",
    sender: "66127ab77fa6cdaaf46ca85d",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-05-20T08:55:00.000Z",
  },
  {
    content: "Just attended a fascinating lecture on thermodynamics!",
    sender: "66127b3d7fa6cdaaf46ca867",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-05-20T09:00:00.000Z",
  },
  {
    content:
      "Currently studying Newton's laws of motion. Does anyone have any tips?",
    sender: "66127b867fa6cdaaf46ca86d",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-05-20T09:05:00.000Z",
  },
  {
    content:
      "Struggling with understanding electromagnetism. Any recommendations for resources?",
    sender: "66127b757fa6cdaaf46ca86b",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-05-20T09:10:00.000Z",
  },
  {
    content:
      "Just conducted a physics experiment and got some interesting results!",
    sender: "66127bd87fa6cdaaf46ca879",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-05-20T09:15:00.000Z",
  },
  {
    content:
      "Reviewing past exam papers to prepare for the upcoming physics test.",
    sender: "66127baa7fa6cdaaf46ca873",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-05-20T09:20:00.000Z",
  },
  {
    content:
      "Just finished reading 'The Elegant Universe' by Brian Greene. Mind-blowing stuff!",
    sender: "66127ab77fa6cdaaf46ca85d",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-05-20T09:25:00.000Z",
  },
  {
    content: "Brushing up on my knowledge of optics. Light is fascinating!",
    sender: "66127b3d7fa6cdaaf46ca867",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-05-20T09:30:00.000Z",
  },
  {
    content:
      "Just watched a documentary on the history of physics. So much to learn!",
    sender: "66127b867fa6cdaaf46ca86d",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-05-20T09:35:00.000Z",
  },
  {
    content: "Exploring the fascinating world of particle physics.",
    sender: "66127b757fa6cdaaf46ca86b",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-05-20T09:40:00.000Z",
  },
  {
    content:
      "Just joined the Physics Pioneers community! Excited to learn and contribute.",
    sender: "66127bd87fa6cdaaf46ca879",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-05-20T09:45:00.000Z",
  },
  {
    content: "Just reviewed the periodic table. Who else finds it fascinating?",
    sender: "660128e020c0f0ac18fda708",
    community: "6612dfe856310add5a7294cc",
    createdAt: "2024-07-20T02:00:44.333Z",
  },
  {
    content: "I'm studying chemical bonding today. Any tips?",
    sender: "66127c347fa6cdaaf46ca87b",
    community: "6612dfe856310add5a7294cc",
    createdAt: "2024-07-20T02:15:00.000Z",
  },
  {
    content:
      "Just finished a lab experiment on titration. It was challenging but rewarding!",
    sender: "66127c417fa6cdaaf46ca87d",
    community: "6612dfe856310add5a7294cc",
    createdAt: "2024-07-20T02:30:00.000Z",
  },
  {
    content: "Studying organic chemistry reactions today. Feeling overwhelmed!",
    sender: "66127c567fa6cdaaf46ca881",
    community: "6612dfe856310add5a7294cc",
    createdAt: "2024-07-20T02:45:00.000Z",
  },
  {
    content: "Any recommendations for a good chemistry textbook?",
    sender: "66127c767fa6cdaaf46ca883",
    community: "6612dfe856310add5a7294cc",
    createdAt: "2024-07-20T03:00:00.000Z",
  },
  {
    content: "Exploring the world of biochemistry today. It's fascinating!",
    sender: "66127c897fa6cdaaf46ca885",
    community: "6612dfe856310add5a7294cc",
    createdAt: "2024-07-20T03:15:00.000Z",
  },
];

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

// communityRouter.get("/user-communities/:userId", async (req, res) => {
//   const userId = req.params.userId;
//   try {
//     const members = await Community.find({
//       members: new ObjectId(userId),
//     })
//       .populate("members", "firstName lastName email profile_pic")
//       .exec();
//     res.json(members);
//   } catch (error) {
//     res.status(400).json({
//       error,
//     });
//   }
// });

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

communityRouter.post("/add-message", async (req, res) => {
  try {
    communityMessages.map(async (message) => {
      await CommunityMsg.create({
        content: message.content,
        sender: message.sender,
        community: message.community,
        createdAt: message.createdAt,
      });
    });

    res.json({
      message: "Success!",
    });
  } catch (error) {
    res.status(400).json({
      message: "Error!",
    });
  }
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
