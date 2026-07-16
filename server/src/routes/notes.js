const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const owner = require("../middleware/owner");
const ensureLogin = require("../middleware/isLogin");
const { body, validationResult } = require("express-validator");
const { sanitizeInput, cleanText } = require("../lib/validation/sanitize"); 

router.get("/", ensureLogin, async (req, res) => {
  try {
    const query = req.query.q || ""; // Gets the query from url
    // new RegExp: tells mongodb to find titles that matches query; i means case in-sensitive
    const filter = query ? { title: new RegExp(query, "i") } : {}; // if no match is found, {} returns everything
    const notes = await Note.find(filter)
      .sort({ createdAt: -1 }) // createdAt: -1 newest to oldest (descending order)
      .populate("user", "username email"); // user is just an id, instead of sending the id, just replace it with username and email info

    return res.status(200).json({ notes });
  } catch (error) {
    return res
      .status(500)
      .json({ errors: [{ message: "Failed to fetch notes" }] });
  }
});

router.post(
  "/add",
  ensureLogin,
  body("title")
    .customSanitizer(value => cleanText(sanitizeInput(value)))
    .trim()
    .notEmpty()
    .withMessage("Enter Title")
    .isLength({ min: 15, max: 50 })
    .withMessage("Must be between 15-50 words limit."),
  body("content")
    .customSanitizer(value => cleanText(sanitizeInput(value))) 
    .trim()
    .notEmpty()
    .withMessage("Enter content")
    .isLength({ min: 250, max: 1024 })
    .withMessage("Must be between 250-1024 words limit."),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), old: req.body });
    }

    const { title, content } = req.body;

    try {
      const newNote = await Note.create({
        title,
        content,
        user: req.user._id,
      });

      const myNote = await newNote.populate("user", "username email");

      return res
        .status(201)
        .json({ message: "note created successfully", myNote });
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ errors: [{ message: " Failed to add note" }], old: req.body });
    }
  },
);

router.put(
  "/edit/:id",
  ensureLogin,
  owner,
  body("title")
    .customSanitizer(value => cleanText(sanitizeInput(value)))
    .trim()
    .notEmpty()
    .withMessage("Enter title")
    .isLength({ min: 15, max: 50 })
    .withMessage("Must be within 15-50 words limit"),
  body("content")
    .customSanitizer(value=> cleanText(sanitizeInput(value)))
    .trim()
    .notEmpty()
    .withMessage("Enter Content")
    .isLength({ min: 250, max: 1024 })
    .withMessage("Must be within 250 - 1024 words limit"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array(), old: req.body });

    const note = await Note.findById(req.params.id);

    if (!note)
      return res.status(404).json({ errors: [{ message: "Note not found" }] });

    const { title, content } = req.body;

    try {
      const isUnchanged = note.title === title && note.content === content;

      if (isUnchanged) {
        return res.status(200).json({
          updatedNote: note,
          message: "No changes detected",
        });
      }
      const updatedNote = await Note.findByIdAndUpdate(
        req.params.id,
        { title, content },
        { new: true },
      ).populate("user", "username email");
      console.log("note updated: ", JSON.stringify(updatedNote));
      return res
        .status(200)
        .json({ updatedNote, message: "Note updated Successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ errors: [{ message: "Failed to update note" }] });
    }
  },
);

router.delete("/delete/:id", ensureLogin, owner, async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (!note)
    return res.status(404).json({ errors: [{ message: "Note not found" }] });

  try {
    await Note.findByIdAndDelete(req.params.id);
    console.log("note deleted: ", JSON.stringify(note));
    return res.status(200).json({ message: "Note deleted successfully!" });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ errors: [{ message: "Failed to delete note" }] });
  }
});

module.exports = router;
