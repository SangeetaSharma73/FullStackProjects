// // pages/Profile.jsx
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const [user, setUser] = useState({
//     name: "",
//     username: "",
//     email: "",
//     avatar: "",
//     password: "",
//   });
//   const [preview, setPreview] = useState(null);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   // Fetch user data
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const res = await fetch("http://localhost:8000/api/user/profile", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//           },
//         });
//         const data = await res.json();
//         if (data) {
//           setUser((prev) => ({
//             ...prev,
//             name: data.name || "",
//             username: data.username || "",
//             email: data.email || "",
//             avatar: data.avatar || "",
//           }));
//           setPreview(data.avatar);
//         }
//       } catch (err) {
//         setMessage("Failed to load profile");
//       }
//     };

//     fetchProfile();
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleFileChange = (e) => {
//     const file = e.target.files[0];
//     setUser((prev) => ({ ...prev, avatar: file }));
//     setPreview(URL.createObjectURL(file));
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setMessage("");

//     const formData = new FormData();
//     formData.append("name", user.name);
//     formData.append("username", user.username);
//     formData.append("email", user.email);
//     if (user.password) formData.append("password", user.password);
//     if (user.avatar instanceof File) formData.append("avatar", user.avatar);

//     try {
//       const res = await fetch("http://localhost:8000/api/user/profile", {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage("Profile updated successfully!");
//         setUser((prev) => ({ ...prev, password: "" }));
//       } else {
//         setMessage(data.message || "Something went wrong");
//       }
//     } catch (err) {
//       setMessage("Error updating profile");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded shadow-md">
//       <h2 className="text-2xl font-semibold mb-4 text-center">My Profile</h2>

//       {message && <p className="mb-4 text-center text-red-500">{message}</p>}

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div className="flex flex-col items-center">
//           <img
//             src={preview || "https://via.placeholder.com/150"}
//             alt="avatar"
//             className="w-28 h-28 rounded-full object-cover mb-2"
//           />
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="file-input file-input-sm file-input-bordered"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Name</label>
//           <input
//             type="text"
//             name="name"
//             value={user.name}
//             onChange={handleChange}
//             className="input input-bordered w-full"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Username</label>
//           <input
//             type="text"
//             name="username"
//             value={user.username}
//             onChange={handleChange}
//             className="input input-bordered w-full"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={user.email}
//             onChange={handleChange}
//             className="input input-bordered w-full"
//           />
//         </div>

//         <div>
//           <label className="block mb-1 font-medium">New Password</label>
//           <input
//             type="password"
//             name="password"
//             value={user.password}
//             onChange={handleChange}
//             placeholder="Leave blank to keep current password"
//             className="input input-bordered w-full"
//           />
//         </div>

//         <button type="submit" className="btn btn-primary w-full mt-4">
//           Update Profile
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Profile;

// pages/Profile.jsx
// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";

// const Profile = () => {
//   const [user, setUser] = useState({
//     name: "",
//     username: "",
//     email: "",
//     avatar: "",
//     password: "",
//   });
//   const [preview, setPreview] = useState(null);
//   const [message, setMessage] = useState("");
//   const navigate = useNavigate();

//   // Fetch user data
//   //   useEffect(() => {
//   //     const fetchProfile = async () => {
//   //       try {
//   //         const res = await fetch("http://localhost:8000/api/user/profile", {
//   //           method: "GET",
//   //           headers: {
//   //             Authorization: `Bearer ${localStorage.getItem("token")}`,
//   //           },
//   //         });
//   //         const data = await res.json();
//   //         if (data) {
//   //           setUser({
//   //             name: data.name || "",
//   //             username: data.username || "",
//   //             email: data.email || "",
//   //             avatar: data.avatar || "",
//   //             password: "", // Never fetch passwords
//   //           });
//   //           setPreview(data.avatar);
//   //         }
//   //       } catch (err) {
//   //         setMessage("Failed to load profile");
//   //       }
//   //     };

//   //     fetchProfile();
//   //   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUser((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleImageChange = (e) => {
//     const file = e.target.files[0];
//     setUser((prev) => ({
//       ...prev,
//       avatar: file,
//     }));
//     if (file) {
//       setPreview(URL.createObjectURL(file));
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("name", user.name);
//     formData.append("username", user.username);
//     formData.append("email", user.email);
//     if (user.password) formData.append("password", user.password);
//     if (user.avatar instanceof File) formData.append("avatar", user.avatar);

//     try {
//       const res = await fetch("http://localhost:8000/api/user/profile/update", {
//         method: "PUT",
//         headers: {
//           Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//         body: formData,
//       });
//       const result = await res.json();
//       if (res.ok) {
//         setMessage("Profile updated successfully!");
//       } else {
//         setMessage(result.error || "Update failed");
//       }
//     } catch (err) {
//       setMessage("Something went wrong!");
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold mb-6 text-center">Edit Profile</h1>
//       {message && (
//         <div className="mb-4 text-center text-red-500 font-medium">
//           {message}
//         </div>
//       )}
//       <form onSubmit={handleSubmit} className="space-y-4">
//         <div>
//           <label className="block mb-1 font-medium">Full Name</label>
//           <input
//             type="text"
//             name="name"
//             value={user.name}
//             onChange={handleChange}
//             className="input input-bordered w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Username</label>
//           <input
//             type="text"
//             name="username"
//             value={user.username}
//             onChange={handleChange}
//             className="input input-bordered w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Email</label>
//           <input
//             type="email"
//             name="email"
//             value={user.email}
//             onChange={handleChange}
//             className="input input-bordered w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">New Password</label>
//           <input
//             type="password"
//             name="password"
//             value={user.password}
//             onChange={handleChange}
//             className="input input-bordered w-full"
//           />
//         </div>
//         <div>
//           <label className="block mb-1 font-medium">Avatar</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleImageChange}
//             className="file-input file-input-bordered w-full"
//           />
//           {preview && (
//             <img
//               src={preview}
//               alt="avatar preview"
//               className="w-24 h-24 rounded-full mt-2 object-cover"
//             />
//           )}
//         </div>
//         <button type="submit" className="btn btn-primary w-full">
//           Save Changes
//         </button>
//       </form>
//     </div>
//   );
// };

// export default Profile;
