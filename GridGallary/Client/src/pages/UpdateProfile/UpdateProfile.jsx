import { useEffect, useState } from "react";

const UpdateProfile = () => {
  const [form, setForm] = useState({
    name: "",
    username: "",
    password: "",
    avatar: null,
    avatarUrl: "", // for preview
  });

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("http://localhost:8000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) {
          const text = await res.text();
          console.error("Error fetching user profile:", text);
          return;
        }

        const data = await res.json();
        setForm((prev) => ({
          ...prev,
          name: data.name || "",
          username: data.username || "",
          avatarUrl: data.avatar || "",
        }));
      } catch (err) {
        console.error("Error fetching user profile:", err);
      }
    };

    fetchUser();
  }, []);

  const handleChange = (e) => {
    if (e.target.name === "avatar") {
      const file = e.target.files[0];
      setForm((prev) => ({
        ...prev,
        avatar: file,
        avatarUrl: file ? URL.createObjectURL(file) : prev.avatarUrl,
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("username", form.username);
      if (form.password) formData.append("password", form.password);
      if (form.avatar) formData.append("avatar", form.avatar);

      const res = await fetch("http://localhost:8000/api/user/profile", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Error updating profile:", text);
        return;
      }

      const data = await res.json();
      alert(data.message || "Profile updated successfully!");
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };

  return (
    <div className="p-10">
      <h2 className="text-xl font-bold mb-4">Update Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-md">
        <input
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="Name"
          className="input input-bordered"
          required
        />
        <input
          name="username"
          value={form.username}
          onChange={handleChange}
          placeholder="Username"
          className="input input-bordered"
          required
        />
        <input
          name="password"
          onChange={handleChange}
          placeholder="New Password"
          type="password"
          className="input input-bordered"
        />
        <input
          type="file"
          name="avatar"
          onChange={handleChange}
          className="file-input"
        />
        {form.avatarUrl && (
          <img
            src={form.avatarUrl}
            alt="Avatar Preview"
            className="w-24 h-24 rounded-full object-cover mt-2"
          />
        )}
        <button type="submit" className="btn btn-primary">
          Update Profile
        </button>
      </form>
    </div>
  );
};

export default UpdateProfile;
