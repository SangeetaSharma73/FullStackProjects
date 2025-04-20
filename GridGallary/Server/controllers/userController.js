const User = require("../models/User");
const bcrypt = require("bcryptjs");

const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    console.log(user);
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (req.body.username) user.username = req.body.username;
    if (req.body.name) user.name = req.body.name;
    if (req.body.password) {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      user.password = hashedPassword;
    }

    if (req.file && req.file.path) {
      user.avatar = req.file.path;
    }

    const updatedUser = await user.save();
    res.json({ message: "Profile updated", user: updatedUser });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getProfile, updateProfile };
