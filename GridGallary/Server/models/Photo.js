const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    url: {
      // changed from imageUrl
      type: String,
      required: true,
    },
    altText: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: "",
    },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    downloads: {
      type: Number,
      default: 0,
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// Convert _id to id and hide __v
photoSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("Photo", photoSchema);
