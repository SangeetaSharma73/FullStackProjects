import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UpdateProfilePage = () => {
  const [username, setUsername] = useState("");
  const [avatarFile, setAvatarFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const res = await fetch("http://localhost:8000/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUsername(data.username);
        // Note: Avatar load karne ki zaroorat nahi upload ke waqt
      }
    };
    fetchUserProfile();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("username", username);
    if (avatarFile) {
      formData.append("avatar", avatarFile);
    }

    await fetch("http://localhost:8000/api/users/me", {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    alert("Profile Updated Successfully!");
    navigate("/profile");
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center">Update Profile</h2>
      <form
        onSubmit={handleUpdate}
        className="flex flex-col gap-4"
        encType="multipart/form-data"
      >
        <input
          type="text"
          placeholder="Username"
          className="input input-bordered w-full"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          type="file"
          className="input input-bordered w-full"
          accept="image/*"
          onChange={(e) => setAvatarFile(e.target.files[0])}
        />
        <button className="btn btn-primary" type="submit">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfilePage;
