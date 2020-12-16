const mongoose = require("mongoose");

const chapterSchema = mongoose.Schema({
  chapterID: {
    type: Number,
    required: true,
    unique: true,
  },
  chapterName: {
    type: String,
    required: true,
  },
  quizzes: {
    id: String,
  },
  topics: [
    {
      topicid: {
        type: String,
        required: true,
      },
      topicName: {
        type: String,
        required: true,
      },
    },
  ],

  result: {},
});

const Chapters = mongoose.model("Chapters", chapterSchema);
module.exports = { Chapters };
