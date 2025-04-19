const express = require("express");
const router = express.Router();
const commentController = require("../controllers/commentController");
const { protect } = require("../middlewares/authMiddleware");

router.post("/add", protect, commentController.addComment); // Add comment
router.get("/:photoId", commentController.getPhotoComments); // Get comments
router.delete("/:id", protect, commentController.deleteComment); // Delete

module.exports = router;
