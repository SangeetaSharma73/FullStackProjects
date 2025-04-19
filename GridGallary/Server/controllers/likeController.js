const Like = require("../models/Like");
const Photo = require("../models/Photo");

exports.likePhoto = async function (req, res) {
  const userId = req.user._id;
  const photoId = req.params.photoId;

  try {
    const alreadyLiked = await Like.findOne({ user: userId, photo: photoId });
    if (alreadyLiked) {
      return res.status(400).json({ message: "Already liked" });
    }

    const like = new Like({ user: userId, photo: photoId });
    await like.save();

    await Photo.findByIdAndUpdate(photoId, {
      $addToSet: { likes: userId },
    });

    res.status(201).json({ message: "Photo liked", like });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.unlikePhoto = async function (req, res) {
  const userId = req.user._id;
  const photoId = req.params.photoId;

  try {
    const like = await Like.findOneAndDelete({ user: userId, photo: photoId });

    if (!like) {
      return res.status(404).json({ message: "Like not found" });
    }

    await Photo.findByIdAndUpdate(photoId, {
      $pull: { likes: userId },
    });

    res.json({ message: "Photo unliked" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getLikesCount = async function (req, res) {
  try {
    const count = await Like.countDocuments({ photo: req.params.photoId });
    res.json({ photoId: req.params.photoId, likes: count });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
