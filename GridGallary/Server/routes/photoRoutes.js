const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const photoController = require("../controllers/photoController");
const { protect, canDeletePhoto } = require("../middlewares/authMiddleware");

// Upload photo
router.post(
  "/upload",
  protect,
  upload.single("image"),
  photoController.uploadPhoto
);

// Get all photos
router.get("/", photoController.getAllPhotos);
router.get("/:id",photoController.getSinglePhoto);
// Delete photo with ownership check
router.delete("/:id", protect, canDeletePhoto, photoController.deletePhoto);

module.exports = router;
