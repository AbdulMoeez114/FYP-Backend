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
  const Chapter = await Chapters.findById(req.params.id);
  const Quiz = await Quizzes.findById(Chapter.quizzes.id);
  console.log(Quiz);
  if (!Quiz)
    return res.status(404).send("The Quiz with the given ID was not found.");

  res.status(201).json(Quiz);
});

//API route to upload a new Quiz.
router.post("/upload-quiz", async (req, res) => {
  console.log(req.body.Quiz);
  console.log(req.body.chapterid);

  let newQuiz = await Quizzes.create(req.body.Quiz);
  console.log(newQuiz);

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

//API route to edit a Quiz
router.put("/edit-quiz", async (req, res) => {
  console.log(req.body.Quiz);
  const Chapter = await Chapters.findById(req.body.chapterid);
  console.log(Chapter.quizzes.id);
  const Quiz = await Quizzes.replaceOne(
    { _id: Chapter.quizzes.id },
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
});

module.exports = router;
