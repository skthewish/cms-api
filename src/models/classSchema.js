const mongoose = require("mongoose");
const classSchema = new mongoose.Schema({
  instructorId: {
    type: String,
    required: true,
  },
  instructorName: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  totalParticipants: {
    type: Number,
    default: 0,
  },
  participantsId: [
    {
      type: String,
    },
  ],
  createdTime: {
    type: Date,
    default: () => {
      let d = new Date(Date.now() + 19800000).toLocaleString();
      return d;
    },
  },
});
const Class = new mongoose.model("Class", classSchema);
module.exports = Class;
