const jwt = require("jsonwebtoken");
const User = require("../models/User");
const Photo = require("../models/Photo");

// const protect = async (req, res, next) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];
//     if (!token) return res.status(401).json({ message: "Not authorized" });

//     const decoded = jwt.verify(token, process.env.JWT_SECRET);
//     req.user = await User.findById(decoded.id).select("-password");

//     if (!req.user) return res.status(404).json({ message: "User not found" });

//     next();
//   } catch (err) {
//     res.status(401).json({ message: "Invalid token" });
//   }
// };


const protect = async (req, res, next) => {
  // Assuming you get token and decode it
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findById(decoded.id);

  if (!user) return res.status(401).json({ message: "User not found" });

  req.user = user; // This will now include isAdmin from DB
  next();
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
