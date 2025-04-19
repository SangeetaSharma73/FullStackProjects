const mongoose = require("mongoose");

const likeSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    photo: { type: mongoose.Schema.Types.ObjectId, ref: "Photo" },
  },
  { timestamps: true }
);

module.exports =mongoose.model("Like", likeSchema);
