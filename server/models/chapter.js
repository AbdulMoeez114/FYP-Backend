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
  topics: [
    {
      topicName: {
        type: String,
        required: true,
      },
    },
  ],
});

const Chapters = mongoose.model("Chapters", chapterSchema);
module.exports = { Chapters };
