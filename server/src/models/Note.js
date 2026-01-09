const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      minlength: 15,
      maxlength: 50,
      trim: true,
      required,
    },

    content: {
      type: String,
      maxlength: 1024,
      minlength: 250,
      required,
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timestamps: true }
);

module.exports = mongoose.model('Note', noteSchema);