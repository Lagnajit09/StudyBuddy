// eventModel.js


const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  start: {
    type: String,
    required: true
  },
  end: {
    type: String,
    required: true
  },
  // Optionally, you can include other fields like userId, etc.
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;










// const mongoose = require('mongoose');

// const eventSchema = new mongoose.Schema({
//   title: String,
//   description: String,
//   date: Date,
//   userId: String
// });

// module.exports = mongoose.model('Event', eventSchema);
