const Photo = require("../models/Photo");
const Like = require("../models/Like");

exports.uploadPhoto = async function (req, res) {
  try {
    if (!req.file || !req.file.path) {
      return res.status(400).json({ message: "Image is required" });
    }

    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { caption, tags } = req.body;

    const photo = await Photo.create({
      imageUrl: req.file.path,
      caption,
      tags: tags ? tags.split(",").map((tag) => tag.trim()) : [],
      uploader: req.user._id,
    });

    res.status(201).json(photo);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// exports.getAllPhotos = async function (req, res) {
//   try {
//     const photos = await Photo.find().populate(
//       "uploader",
//       "name username avatar"
//     );
//     res.json(photos);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

exports.getAllPhotos = async function (req, res) {
  try {
    const photos = await Photo.find().populate(
      "uploader",
      "name username avatar"
    );

    // For each photo, attach like count
    const photosWithLikes = await Promise.all(
      photos.map(async (photo) => {
        const likeCount = await Like.countDocuments({ photo: photo._id });

        return {
          _id: photo._id,
          imageUrl: photo.imageUrl,
          caption: photo.caption,
          tags: photo.tags,
          uploader: photo.uploader,
          createdAt: photo.createdAt,
          updatedAt: photo.updatedAt,
          likeCount, // 👈 Add like count here
        };
      })
    );

    res.json(photosWithLikes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deletePhoto = async function (req, res) {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) return res.status(404).json({ message: "Photo not found" });

    await Photo.deleteOne({ _id: req.params.id });
    res.json({ message: "Photo deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getSinglePhoto = async function (req, res) {
  try {
    const photo = await Photo.findById(req.params.id).populate(
      "uploader",
      "name username avatar"
    );

    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    const likeCount = await Like.countDocuments({ photo: photo._id });

    res.json({
      _id: photo._id,
      imageUrl: photo.imageUrl,
      caption: photo.caption,
      tags: photo.tags,
      uploader: photo.uploader,
      createdAt: photo.createdAt,
      updatedAt: photo.updatedAt,
      likeCount,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
