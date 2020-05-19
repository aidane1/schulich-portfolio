const mongoose = require("mongoose");

const LeaderSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  school: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    required: true,
  },
});

const Event = mongoose.model("leader", LeaderSchema);
module.exports = Event;
