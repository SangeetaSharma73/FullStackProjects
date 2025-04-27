// // pages/ProfilePage.jsx
// import { useEffect, useState } from "react";

// const ProfilePage = () => {
//   const [user, setUser] = useState(null);

//   useEffect(() => {
//     const fetchUserProfile = async () => {
//       const token = localStorage.getItem("token");
//       if (token) {
//         const res = await fetch("http://localhost:8000/api/users/me", {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await res.json();
//         setUser(data);
//       }
//     };

//     fetchUserProfile();
//   }, []);

//   if (!user)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         Loading...
//       </div>
//     );

//   return (
//     <div className="max-w-md mx-auto mt-10 bg-white p-6 rounded-lg shadow-md">
//       <div className="flex flex-col items-center">
//         {/* <img
//           src={user.avatar || "default-avatar.png"}
//           alt="avatar"
//           className="w-24 h-24 rounded-full object-cover border border-gray-300"
//         /> */}
//         <img
//           src={
//             user.avatar
//               ? `http://localhost:8000${user.avatar}`
//               : "default-avatar.png"
//           }
//           alt="avatar"
//           className="w-full h-full object-cover"
//         />

//         <h2 className="text-2xl font-bold mt-4">{user.username}</h2>
//         <p className="text-gray-600">{user.email}</p>
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const ProfilePage = () => {
//   const [user, setUser] = useState(null);
//   const [requests, setRequests] = useState([]);
//   const [offers, setOffers] = useState([]);
//   const navigate = useNavigate();

//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     const fetchData = async () => {
//       if (!token) return;

//       const headers = { Authorization: `Bearer ${token}` };

//       const [userRes, reqRes, offerRes] = await Promise.all([
//         fetch("http://localhost:8000/api/users/me", { headers }),
//         fetch("http://localhost:8000/api/requests/my", { headers }),
//         fetch("http://localhost:8000/api/offers/my", { headers }),
//       ]);

//       const userData = await userRes.json();
//       const requestData = await reqRes.json();
//       const offerData = await offerRes.json();

//       setUser(userData);
//       setRequests(requestData);
//       setOffers(offerData);
//     };

//     fetchData();
//   }, []);

//   const handleDelete = async (type, id) => {
//     const endpoint =
//       type === "request"
//         ? `http://localhost:8000/api/requests/${id}`
//         : `http://localhost:8000/api/offers/${id}`;

//     await fetch(endpoint, {
//       method: "DELETE",
//       headers: { Authorization: `Bearer ${token}` },
//     });

//     // Refresh list after deletion
//     if (type === "request") {
//       setRequests(requests.filter((r) => r._id !== id));
//     } else {
//       setOffers(offers.filter((o) => o._id !== id));
//     }
//   };

//   if (!user) return <div className="text-center mt-10">Loading...</div>;

//   return (
//     <div className="max-w-4xl mx-auto mt-10 space-y-10">
//       <div className="bg-white p-6 rounded shadow-md text-center">
//         <img
//           src={
//             user.avatar
//               ? `http://localhost:8000${user.avatar}`
//               : "default-avatar.png"
//           }
//           alt="avatar"
//           className="w-24 h-24 rounded-full mx-auto object-cover"
//         />
//         <h2 className="text-2xl font-bold mt-4">{user.username}</h2>
//         <p className="text-gray-600">{user.email}</p>
//       </div>

//       <div>
//         <h3 className="text-xl font-bold mb-2">My Help Requests</h3>
//         {requests.length === 0 ? (
//           <p>No help requests found.</p>
//         ) : (
//           requests.map((req) => (
//             <div
//               key={req._id}
//               className="bg-gray-100 p-4 mb-3 rounded shadow-sm"
//             >
//               <p>
//                 <strong>Type:</strong> {req.type}
//               </p>
//               <p>
//                 <strong>Status:</strong> {req.status}
//               </p>
//               <p>{req.description}</p>
//               <div className="flex gap-3 mt-2">
//                 <button
//                   className="btn btn-sm btn-info"
//                   onClick={() => navigate(`/requests/${req._id}`)}
//                 >
//                   View
//                 </button>
//                 <button
//                   className="btn btn-sm btn-warning"
//                   onClick={() => navigate(`/requests/edit/${req._id}`)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="btn btn-sm btn-error"
//                   onClick={() => handleDelete("request", req._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>

//       <div>
//         <h3 className="text-xl font-bold mb-2">My Help Offers</h3>
//         {offers.length === 0 ? (
//           <p>No help offers found.</p>
//         ) : (
//           offers.map((offer) => (
//             <div
//               key={offer._id}
//               className="bg-gray-100 p-4 mb-3 rounded shadow-sm"
//             >
//               <p>
//                 <strong>Type:</strong> {offer.type}
//               </p>
//               <p>{offer.availability}</p>
//               <div className="flex gap-3 mt-2">
//                 <button
//                   className="btn btn-sm btn-info"
//                   onClick={() => navigate(`/offers/${offer._id}`)}
//                 >
//                   View
//                 </button>
//                 <button
//                   className="btn btn-sm btn-warning"
//                   onClick={() => navigate(`/offers/edit/${offer._id}`)}
//                 >
//                   Edit
//                 </button>
//                 <button
//                   className="btn btn-sm btn-error"
//                   onClick={() => handleDelete("offer", offer._id)}
//                 >
//                   Delete
//                 </button>
//               </div>
//             </div>
//           ))
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProfilePage;

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ProfilePage = ({ userId }) => {
  const [user, setUser] = useState({});
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data
    axios
      .get(`http://localhost:8000/api/users/${userId}`)
      .then((response) => setUser(response.data));

    // Fetch user posts (both Help Requests and Help Offers)
    axios
      .get(`http://localhost:8000/api/feed/my`)
      .then((response) => setPosts(response.data));
  }, [userId]);

  const handleDelete = (postId) => {
    axios
      .delete(`http://localhost:8000/api/feed/${postId}`)
      .then(() => {
        setPosts(posts.filter((post) => post._id !== postId));
      })
      .catch((error) => console.error("Failed to delete post:", error));
  };

  const handleEdit = (postId) => {
    navigate(`/edit-post/${postId}`);
  };

  return (
    <div className="profile-page">
      <div className="profile-header">
        <img src={user.avatar} alt={user.name} className="avatar" />
        <h2>{user.name}</h2>
        <p>{user.bio}</p>
      </div>

      <div className="posts">
        <h3>Your Posts</h3>
        {posts.length === 0 ? (
          <p>No posts yet!</p>
        ) : (
          posts.map((post) => (
            <div key={post._id} className="post">
              <h4>{post.type}</h4>
              <p>{post.description}</p>
              <button onClick={() => handleEdit(post._id)}>Edit</button>
              <button onClick={() => handleDelete(post._id)}>Delete</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
