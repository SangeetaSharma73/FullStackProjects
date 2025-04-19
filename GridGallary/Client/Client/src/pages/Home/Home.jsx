import React from "react";
import { FiSearch } from "react-icons/fi";
import Navbar from "../../components/NavBar";
import Footer from "../../components/Footer";
import ImageGallery from "../imageGallery/ImageGallery";

function Home() {
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
          <span className="text-white text-sm">Scroll down</span>
        </div>
      </div>

      <ImageGallery />
      <Footer />
    </div>
  );
}

export default Home;
