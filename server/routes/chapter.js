const express = require("express");
const router = express.Router();
const { Chapters } = require("../models/chapter");

router.get("/", async (req, res) => {
  const Chapter = await Chapters.find();
  res.status(200).json(Chapter);
});

router.post("/addChapter", async (req, res) => {
  try {
    const Chapter = await Chapters.create(req.body);

    return res.status(201).json(Chapter);
  } catch (error) {
    return res.status(500).json({ error: error });
  }
});

module.exports = router;
