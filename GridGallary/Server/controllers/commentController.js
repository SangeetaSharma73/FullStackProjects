const Comment = require("../models/Comment");

// Add a new comment
exports.addComment = async function (req, res) {
  const { photoId, text } = req.body;

  if (!photoId || !text) {
    return res.status(400).json({ message: "Photo ID and text are required" });
  }

  try {
    const comment = await Comment.create({
      photo: photoId,
      user: req.user._id,
      text,
    });

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get comments for a photo
exports.getPhotoComments = async function (req, res) {
  const photoId = req.params.photoId;

  try {
    const comments = await Comment.find({ photo: photoId })
      .populate("user", "name username avatar")
      .sort({ createdAt: -1 });

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a comment
exports.deleteComment = async function (req, res) {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    const isOwner = comment.user.toString() === req.user._id.toString();
    const isAdmin = req.user.isAdmin;

    if (isOwner || isAdmin) {
      await Comment.findByIdAndDelete(req.params.id);
      return res.json({ message: "Comment deleted" });
    } else {
      return res.status(403).json({ message: "Not authorized" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
