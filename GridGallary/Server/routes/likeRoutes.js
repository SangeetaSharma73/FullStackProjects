const express = require("express");
const router = express.Router();
const likeController = require("../controllers/likeController");
const { protect } = require("../middlewares/authMiddleware");

// Like a photo
router.post("/:photoId", protect, likeController.likePhoto);

// Unlike a photo
router.delete("/:photoId", protect, likeController.unlikePhoto);

// Get total likes
router.get("/:photoId/count", likeController.getLikesCount);

module.exports = router;
