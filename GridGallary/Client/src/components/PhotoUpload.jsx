import React, { useState } from "react";
import axios from "axios";

function PhotoUpload() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append("image", image); // key should match upload.single("image")
    formData.append("caption", caption);
    formData.append("tags", tags);

    const token = localStorage.getItem("token"); // Make sure token is stored after login

    try {
      const response = await axios.post(
        "http://localhost:8000/api/photos/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Upload successful:", response.data);
    } catch (err) {
      console.error("Upload failed:", err.response?.data || err.message);
    }
  };

  return (
    <div>
      <h2>Upload Photo</h2>
      <input
        type="file"
        onChange={(e) => setImage(e.target.files[0])}
        accept="image/*"
      />
      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (comma-separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

export default PhotoUpload;
