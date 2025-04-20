const express = require("express");
const { getProfile, updateProfile } = require("../controllers/userController");
const { protect } = require("../middlewares/authMiddleware");
// const { protect } = require("../middlewares/auth");
const upload = require("../middlewares/uploadMiddleware");

const router = express.Router();

router.get("/profile", protect, getProfile);
router.put("/profile", protect, upload.single("avatar"), updateProfile);

module.exports = router;
