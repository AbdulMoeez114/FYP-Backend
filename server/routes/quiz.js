const express = require("express");
const router = express.Router();
const { Quizzes } = require("../models/quiz");
const { Chapters } = require("../models/chapter");

router.get("/", async (req, res) => {
  const Quiz = await Quizzes.find();
  res.status(200).json(Quiz);
});

router.post("/upload-quiz", async (req, res) => {
  try {
    const newQuiz = await Quizzes.create(req.body.QUIZ);
    const Chapter = await Chapters.findByIdAndUpdate(
      { _id: req.body.chapterID },
      {
        $push: {
          quizzes: { id: newQuiz._id, quizNumber: newQuiz.quizID },
        },
      },
      { new: true }
    );
    if (!Chapter)
      return res
        .status(404)
        .send("The Chapter with the given ID was not found.");

    Chapter.save();
    newQuiz.save();

    return res.status(201).json(newQuiz);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;
