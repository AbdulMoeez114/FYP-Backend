const express = require("express");
const router = express.Router();
const { Quizzes } = require("../models/quiz");
const { Chapters } = require("../models/chapter");

//API route to get all quizzes.
router.get("/", async (req, res) => {
  const Quiz = await Quizzes.find();
  res.status(200).json(Quiz);
});

//API route to get a quiz with a specific ID.
router.get("/:id", async (req, res) => {
  const Quiz = await Quizzes.findById(req.params.id);

  if (!Quiz)
    return res.status(404).send("The Quiz with the given ID was not found.");

  res.status(201).json(Quiz);
});

//API route to upload a new Quiz.
router.post("/upload-quiz", async (req, res) => {
  console.log(req.body.Quiz);
  console.log(req.body.chapterid);

  let newQuiz = await Quizzes.create(req.body.Quiz);

  console.log(newQuiz._id);
  const Chapter = await Chapters.findByIdAndUpdate(
    { _id: req.body.chapterid },
    {
      quizzes: { id: newQuiz._id },
    },
    { new: true }
  );
  if (!Chapter)
    return res.status(404).send("The Chapter with the given ID was not found.");

  return res.status(201).send(true);
});

router.put("/edit-quiz", async (req, res) => {
  const Quiz = await Quizzes.replaceOne(
    { _id: req.body.quizID },
    req.body.Quiz
  );
  if (!Quiz)
    return res.status(404).send("The Quiz with the given ID was not found.");
  res.status(201).json(Quiz);
});

//API route to delete a Quiz.
router.delete("/delete-quiz", async (req, res) => {
  const Quiz = await Quizzes.findById(req.body.quizID);
  if (!Quiz)
    return res.status(404).send("The Quiz with the given ID was not found.");

  Quiz.remove();
  const Chapter = await Chapters.findByIdAndUpdate(
    { _id: req.body.chapterID },
    {
      quizzes: {},
    },
    { new: true }
  );

  if (!Chapter)
    return res.status(404).send("The Chapter with the given ID was not found.");

  res.status(201).json(Chapter);
  Chapter.save();
});

module.exports = router;
