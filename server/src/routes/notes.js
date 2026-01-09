const express = require("express");
const router = express.Router();
const Note = require("../models/Note");
const owner = require("../middleware/owner");
const ensureLogin = require("../middleware/isLogin");
const { body, validationResult } = require("express-validator");

router.get("/", async (req, res) => {
  try {
    const query = req.query.q || ""; // Gets the query from url
    // new RegExp: tells mongodb to find titles that matches query; i means case in-sensitive
    const filter = query ? { title: new RegExp(query, "i") } : {}; // if no match is found, {} returns everything
    const notes = await Note.find(filter)
      .sort({ createdAt: -1 }) // createdAt: -1 newest to oldest (descending order)
      .populate("user", "username email"); // user is just an id, instead of sending the id, just replace it with username and email info

    return res.status(200).json({ notes });
  } catch (error) {
    return res.status(500).json({ errors: "Failed to fetch notes" });
  }
});

router.post(
  "/add",
  ensureLogin,
  body("title")
    .notEmpty()
    .withMessage("Enter Title")
    .isLength({ min: 15, max: 50 })
    .withMessage("Must be between 15-50 words limit."),
  body("content")
    .notEmpty()
    .withMessage("Enter content")
    .isLength({ min: 250, max: 1024 })
    .withMessage("Must be between 250-1024 words limit."),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(404).json({ errors: errors.array(), old: req.body });
    }

    try {
      const newNote = await Note.create({
        title,
        content,
        user: req.session._id,
      });
      return res.status(201).json(newNote);
    } catch (error) {
      console.log(error);
      return res
        .status(500)
        .json({ errors: [{ msg: " Failed to add note" }], old: req.body });
    }
  }
);

router.post(
  "/edit/:id",
  ensureLogin,
  owner,
  body("title")
    .notEmpty()
    .withMessage("Enter title")
    .isLength({ min: 15, min: 50 })
    .withMessage("Must be within 15-50 words limit"),
  body("content")
    .notEmpty()
    .withMessage("Enter Content")
    .isLength({ min: 250, max: 1024 })
    .withMessage("Must be within 250 - 1024 words limit"),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty())
      return res.status(400).json({ errors: errors.array(), old: req.body });

    const note = await Note.findById(req.params.id);

    if (!note) return res.status(404).json({ errors: [{ msg: "Note not found" }] });

    try{
        const updatedNote = await Note.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            content: req.body.content,
        });
        return res.status(200).json(updatedNote);
    }catch(error){
        return res.status(500).json({errors: [{msg: "Failed to update note"}]})
    }
  }
);

router.post('/delete/:id',ensureLogin, owner, async (req,res)=>{
    const note = await Note.findById(req.params.id)

    if(!note) return res.status(404).json({errors: [{msg: "Note not found"}]});

    try{
        await Note.findByIdAndDelete(note);
        console.log("note deleted: ", JSON.stringify(note))
        return res.status(200);

    }catch(error){
        console.log(error);
        return res.status(500).json({errors: [{msg: "Failed to delete note"}]})
    }
})

module.exports = router;