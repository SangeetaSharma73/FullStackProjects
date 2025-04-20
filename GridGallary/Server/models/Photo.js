const mongoose = require("mongoose");

const photoSchema = new mongoose.Schema(
  {
    imageUrl: { type: String, required: true },
    caption: { type: String, default: "" }, // Added
    altText: { type: String, default: "" },
    description: { type: String, default: "" },
    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    downloads: { type: Number, default: 0 },
    tags: { type: [String], default: [] },
  },
  { timestamps: true }
);

photoSchema.set("toJSON", {
  virtuals: true,
  transform: (doc, ret) => {
    ret.id = ret._id;
    delete ret._id;
    delete ret.__v;
  },
});

module.exports = mongoose.model("Photo", photoSchema);
