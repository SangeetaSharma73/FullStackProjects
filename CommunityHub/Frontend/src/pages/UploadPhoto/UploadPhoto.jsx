import React, { useState } from "react";
import axios from "axios";

function UploadPhoto() {
  const [image, setImage] = useState(null);
  const [caption, setCaption] = useState("");
  const [tags, setTags] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);
    formData.append("tags", tags);

    try {
      const res = await axios.post("/api/photos/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${localStorage.getItem("token")}`, // or however you're storing JWT
        },
      });
      alert("Photo uploaded!");
    } catch (err) {
      console.error(err);
      alert("Upload failed.");
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />
      <input
        type="text"
        placeholder="Caption"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
      />
      <input
        type="text"
        placeholder="Tags (comma separated)"
        value={tags}
        onChange={(e) => setTags(e.target.value)}
      />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadPhoto;
