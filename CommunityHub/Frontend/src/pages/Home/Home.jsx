import React from "react";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import axios from "axios";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";

function Home() {
  {
    /* new code which i put here */
  }
  const [feed, setFeed] = useState([]);
  const [newPost, setNewPost] = useState({
    type: "food",
    description: "",
    location: { lat: 0, lng: 0 },
  });

  useEffect(() => {
    // Fetch all posts (Help Requests and Help Offers)
    axios
      .get("http://localhost:8000/api/feed")
      .then((response) => setFeed(response.data));
  }, []);

  const handlePostChange = (e) => {
    const { name, value } = e.target;
    setNewPost({ ...newPost, [name]: value });
  };

  const handlePostSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/feed", newPost)
      .then((response) => {
        setFeed([response.data, ...feed]); // Add the new post to the feed
      })
      .catch((error) => console.error("Error creating post:", error));
  };

  return (
    <div>
      <Navbar />
      <div
        className="relative h-[60vh] w-full flex items-center justify-center bg-cover bg-center bg-no-repeat text-white overflow-hidden"
        style={{
          backgroundImage:
            "url('https://source.unsplash.com/1600x900/?nature,landscape')",
        }}
      >
        {/* Overlay */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm"></div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-2xl">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            Discover Stunning Free Images
          </h1>
          <p className="text-lg sm:text-xl mb-6">
            Beautiful, high-quality photos curated by our community.
          </p>

          {/* Search bar */}
          <div className="flex items-center bg-white/90 rounded-full px-4 py-2 shadow-md w-full max-w-xl mx-auto text-gray-800 focus-within:ring-2 ring-blue-400">
            <FiSearch size={20} className="mr-3 text-gray-500" />
            <input
              type="text"
              placeholder="Search for photos, people, or topics..."
              className="flex-grow bg-transparent outline-none placeholder-gray-500"
            />
          </div>
        </div>

        {/* Scroll Down Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 animate-bounce z-10">
          <span className="text-white text-sm">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2__At4DcMOCIXX1CCdF-gdmYwIFSwpsFBT86dP74PRigBXsG_tLYN6gg4cMM8j3yh-18&usqp=CAU"
              alt="Arrow Image"
              className="w-7 rounded-full"
            />
          </span>
        </div>
      </div>

      {/* new code which i put here */}
      <div className="home-page">
        <h2>Feed</h2>
        <form onSubmit={handlePostSubmit}>
          <input
            type="text"
            name="description"
            value={newPost.description}
            onChange={handlePostChange}
            placeholder="Describe your offer or request"
          />
          <select name="type" value={newPost.type} onChange={handlePostChange}>
            <option value="food">Food</option>
            <option value="medical">Medical</option>
            <option value="transport">Transport</option>
            <option value="other">Other</option>
          </select>
          <button type="submit">Post</button>
        </form>

        <div className="posts">
          {feed.map((post) => (
            <div key={post._id} className="post">
              <h4>{post.type}</h4>
              <p>{post.description}</p>
              <button>Like</button>
              <button>Unlike</button>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Home;
