const mongoose = require("mongoose");

const noteSchema = mongoose.Schema(
  {
    title: {
      type: String,
      maxlength: 50,
      trim: true,
    },

    content: String,

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },

  { timestamp: true }
);

module.exports = mongoose.model('Note', noteSchema);