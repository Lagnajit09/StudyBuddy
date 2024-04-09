const { User, Community, CommunityMsg } = require("../db");
const express = require("express");
const { ObjectId } = require("mongodb");
const communityRouter = express.Router();

const communityMessages = [
  {
    content: "Hey everyone! Just wanted to say hi and introduce myself.",
    sender: "660128e020c0f0ac18fda708",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-03-25T13:15:00.000Z",
  },
  {
    content: "Welcome, Lagnajit! Glad to have you here.",
    sender: "66012a2620c0f0ac18fda70a",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-03-25T13:17:00.000Z",
  },
  {
    content: "Hi everyone! I'm excited to be part of this community.",
    sender: "66127a937fa6cdaaf46ca857",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-03-25T13:20:00.000Z",
  },
  {
    content: "Hello, fellow developers! Let's create amazing things together.",
    sender: "66127ade7fa6cdaaf46ca861",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-03-25T13:25:00.000Z",
  },
  {
    content: "Hey guys, has anyone worked with React before?",
    sender: "66127a9e7fa6cdaaf46ca859",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-03-25T13:30:00.000Z",
  },
  {
    content:
      "Yes, I have some experience with React. What do you need help with?",
    sender: "66127b307fa6cdaaf46ca865",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-03-25T13:35:00.000Z",
  },
  {
    content:
      "Also, here's a useful tutorial I found: [React Tutorial](https://reactjs.org/tutorial/tutorial.html)",
    sender: "66127b307fa6cdaaf46ca865",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-03-25T13:40:00.000Z",
  },
  {
    content: "Thanks for sharing, Umesh!",
    sender: "66127ab77fa6cdaaf46ca85d",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-03-25T13:45:00.000Z",
  },
  {
    content: "I'm struggling with CSS animations. Any tips?",
    sender: "660128e020c0f0ac18fda708",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-03-25T13:50:00.000Z",
  },
  {
    content:
      "Sure, here's a great resource: [CSS Animations Guide](https://css-tricks.com/css-animation-libraries/)",
    sender: "66127ab77fa6cdaaf46ca85d",
    community: "6612df1a56310add5a7294c4",
    createdAt: "2024-03-25T13:55:00.000Z",
  },
  {
    content: "Hey everyone! Excited to learn more about Python!",
    sender: "660128e020c0f0ac18fda708",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-03-25T14:00:00.000Z",
  },
  {
    content: "Welcome to the Pythonistas community!",
    sender: "66127ab77fa6cdaaf46ca85d",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-03-25T14:05:00.000Z",
  },
  {
    content:
      "I'm currently working on a Python project for data analysis. Any tips?",
    sender: "66127a937fa6cdaaf46ca857",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-03-25T14:10:00.000Z",
  },
  {
    content: "Sure! What specifically are you struggling with?",
    sender: "66127b307fa6cdaaf46ca865",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-03-25T14:15:00.000Z",
  },
  {
    content: "I'm having trouble with data visualization.",
    sender: "66127a9e7fa6cdaaf46ca859",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-03-25T14:20:00.000Z",
  },
  {
    content:
      "Here's a great library for data visualization in Python: [Matplotlib](https://matplotlib.org/)",
    sender: "66127b307fa6cdaaf46ca865",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-03-25T14:25:00.000Z",
  },
  {
    content: "Thanks! I'll check it out.",
    sender: "66127a9e7fa6cdaaf46ca859",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-03-25T14:30:00.000Z",
  },
  {
    content: "Anyone here familiar with Flask?",
    sender: "66012a2620c0f0ac18fda70a",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-03-25T14:35:00.000Z",
  },
  {
    content:
      "Yes, I've used Flask for web development. What do you need help with?",
    sender: "66127a937fa6cdaaf46ca857",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-03-25T14:40:00.000Z",
  },
  {
    content:
      "I'm trying to build a simple REST API with Flask. Any good tutorials?",
    sender: "660128e020c0f0ac18fda708",
    community: "6612df5656310add5a7294c6",
    createdAt: "2024-03-25T14:45:00.000Z",
  },
  {
    content:
      "Hello fellow AI enthusiasts! Excited to learn and explore together.",
    sender: "6612df8056310add5a7294c8",
    community: "66127a937fa6cdaaf46ca857",
    createdAt: "2024-03-25T15:00:00.000Z",
  },
  {
    content:
      "Welcome to the AI Explorers community! Let's dive into the world of artificial intelligence.",
    sender: "66127a9e7fa6cdaaf46ca859",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-03-25T15:05:00.000Z",
  },
  {
    content:
      "I'm currently studying machine learning algorithms. Any recommendations for resources?",
    sender: "66127b307fa6cdaaf46ca865",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-03-25T15:10:00.000Z",
  },
  {
    content:
      "Sure! Have you checked out the book 'Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow'?",
    sender: "660128e020c0f0ac18fda708",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-03-25T15:15:00.000Z",
  },
  {
    content: "Yes, it's on my list! I'll definitely give it a read.",
    sender: "66127b307fa6cdaaf46ca865",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-03-25T15:20:00.000Z",
  },
  {
    content:
      "I'm interested in natural language processing. Any projects I can contribute to?",
    sender: "66127a937fa6cdaaf46ca857",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-03-25T15:25:00.000Z",
  },
  {
    content:
      "We're working on a sentiment analysis project. Would you like to join?",
    sender: "66127ab77fa6cdaaf46ca85d",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-03-25T15:30:00.000Z",
  },
  {
    content: "That sounds interesting! Count me in.",
    sender: "66127a9e7fa6cdaaf46ca859",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-03-25T15:35:00.000Z",
  },
  {
    content: "Is anyone here familiar with reinforcement learning?",
    sender: "66127b307fa6cdaaf46ca865",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-03-25T15:40:00.000Z",
  },
  {
    content:
      "I've worked on some reinforcement learning projects. Happy to help!",
    sender: "660128e020c0f0ac18fda708",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-03-25T15:45:00.000Z",
  },
  {
    content:
      "I'm curious about generative adversarial networks (GANs). Any good tutorials?",
    sender: "66127b307fa6cdaaf46ca865",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-03-25T15:50:00.000Z",
  },
  {
    content:
      "Check out the 'GANs in Action' book by Jakub Langr and Vladimir Bok. It's a great resource!",
    sender: "660128e020c0f0ac18fda708",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-03-25T15:55:00.000Z",
  },
  {
    content: "Thanks! I'll definitely look into it.",
    sender: "66127b307fa6cdaaf46ca865",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-03-25T16:00:00.000Z",
  },
  {
    content:
      "I'm working on a computer vision project using convolutional neural networks (CNNs). Anyone interested in collaborating?",
    sender: "66127a9e7fa6cdaaf46ca859",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-03-25T16:05:00.000Z",
  },
  {
    content:
      "Count me in! I've been wanting to gain more experience with CNNs.",
    sender: "66127ab77fa6cdaaf46ca85d",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-03-25T16:10:00.000Z",
  },
  {
    content:
      "Awesome! Let's discuss project details in our next community meeting.",
    sender: "66127a9e7fa6cdaaf46ca859",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-03-25T16:15:00.000Z",
  },
  {
    content:
      "I'm interested in exploring deep reinforcement learning. Any good starting points?",
    sender: "66127ab77fa6cdaaf46ca85d",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-03-25T16:20:00.000Z",
  },
  {
    content:
      "You might find the 'Deep Reinforcement Learning Hands-On' book by Maxim Lapan helpful!",
    sender: "66127b307fa6cdaaf46ca865",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-03-25T16:25:00.000Z",
  },
  {
    content: "Thanks! I'll check it out.",
    sender: "66127ab77fa6cdaaf46ca85d",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-03-25T16:30:00.000Z",
  },
  {
    content:
      "Does anyone have experience with deploying machine learning models in production?",
    sender: "66127a937fa6cdaaf46ca857",
    community: "6612df8056310add5a7294c8",
    createdAt: "2024-03-25T16:35:00.000Z",
  },
  {
    content:
      "Greetings, fellow physicists! Excited to delve into the mysteries of the universe.",
    sender: "66127a937fa6cdaaf46ca857",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-03-25T17:00:00.000Z",
  },
  {
    content:
      "Welcome to the Physics Enthusiasts community! Let's explore the wonders of physics together.",
    sender: "66127bba7fa6cdaaf46ca873",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-03-25T17:05:00.000Z",
  },
  {
    content:
      "I'm currently studying quantum mechanics. Any tips for understanding the concepts better?",
    sender: "66127ab77fa6cdaaf46ca85d",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-03-25T17:10:00.000Z",
  },
  {
    content:
      "Have you tried visualizing quantum phenomena with animations? It can help grasp complex ideas.",
    sender: "66127a937fa6cdaaf46ca857",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-03-25T17:15:00.000Z",
  },
  {
    content:
      "That's a great suggestion! Do you have any recommended resources for quantum animations?",
    sender: "66127ab77fa6cdaaf46ca85d",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-03-25T17:20:00.000Z",
  },
  {
    content:
      "Check out the YouTube channel 'MinutePhysics'. They have some excellent videos on quantum mechanics.",
    sender: "66127a937fa6cdaaf46ca857",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-03-25T17:25:00.000Z",
  },
  {
    content: "Thanks! I'll definitely take a look.",
    sender: "66127ab77fa6cdaaf46ca85d",
    community: "6612dfab56310add5a7294ca",
    createdAt: "2024-03-25T17:30:00.000Z",
  },
  {
    content:
      "Hello chemistry enthusiasts! Looking forward to exploring the fascinating world of chemistry with you all.",
    sender: "66127a937fa6cdaaf46ca857",
    community: "6612dfe856310add5a7294cc",
    createdAt: "2024-03-25T18:00:00.000Z",
  },
  {
    content:
      "Welcome to the Chemistry Lovers community! Let's discover the beauty of molecules and reactions together.",
    sender: "66127c417fa6cdaaf46ca87d",
    community: "6612dfe856310add5a7294cc",
    createdAt: "2024-03-25T18:05:00.000Z",
  },
  {
    content:
      "I'm currently studying organic chemistry. Any tips for mastering mechanisms?",
    sender: "66127bba7fa6cdaaf46ca873",
    community: "6612dfe856310add5a7294cc",
    createdAt: "2024-03-25T18:10:00.000Z",
  },
  {
    content:
      "Practice, practice, practice! Mechanisms become clearer with hands-on experimentation.",
    sender: "66127a937fa6cdaaf46ca857",
    community: "6612dfe856310add5a7294cc",
    createdAt: "2024-03-25T18:15:00.000Z",
  },
  {
    content: "Thanks for the advice! I'll spend more time in the lab.",
    sender: "66127bba7fa6cdaaf46ca873",
    community: "6612dfe856310add5a7294cc",
    createdAt: "2024-03-25T18:20:00.000Z",
  },
  {
    content: "Anyone here fascinated by chemical kinetics?",
    sender: "66127a937fa6cdaaf46ca857",
    community: "6612dfe856310add5a7294cc",
    createdAt: "2024-03-25T18:25:00.000Z",
  },
  {
    content: "Absolutely! The dynamics of reactions are mesmerizing.",
    sender: "66127c417fa6cdaaf46ca87d",
    community: "6612dfe856310add5a7294cc",
    createdAt: "2024-03-25T18:30:00.000Z",
  },
];

communityRouter.post("/create", async (req, res) => {
  const { name, description, members, createdBy } = req.body;

  try {
    const newCommunity = await Community.create({
      name,
      description,
      members,
      createdBy,
    });

    res.json({
      message: "New community created successfully!",
      newCommunity,
    });
  } catch (err) {
    res.status(400).json({
      message: "Error ceating new community: ",
      err,
    });
  }
});

communityRouter.get("/user-communities/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const members = await Community.find({
      members: new ObjectId(userId),
    })
      .populate("members", "firstName lastName email profile_pic")
      .exec();
    res.json(members);
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

communityRouter.get("/messages/:id", async (req, res) => {
  const community = new ObjectId(req.params.id);

  const messages = await CommunityMsg.find({ community });
  res.json(messages);
});

module.exports = communityRouter;
