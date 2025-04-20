const jwt = require("jsonwebtoken");
const Photo = require("../models/Photo");
// const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id).select("-password");
      next();
    } catch (err) {
      res.status(401).json({ message: "Invalid token" });
    }
  }

  if (!token) {
    res.status(401).json({ message: "Not authorized, token missing" });
  }
};

const isAdmin = (req, res, next) => {
  if (req.user && req.user.isAdmin) return next();
  return res
    .status(403)
    .json({ message: "Only admins can perform this action" });
};

const canDeletePhoto = async (req, res, next) => {
  try {
    const photo = await Photo.findById(req.params.id);
    if (!photo) {
      return res.status(404).json({ message: "Photo not found" });
    }

    if (
      photo.uploader.toString() === req.user._id.toString() ||
      req.user.isAdmin
    ) {
      req.photo = photo;
      next();
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this photo" });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = { protect, isAdmin, canDeletePhoto };
