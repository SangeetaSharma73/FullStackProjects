import { useState } from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { FiHeart, FiPlus, FiDownload } from "react-icons/fi";

function ImageCard({ src, user }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative group overflow-hidden rounded-lg">
      {!isLoaded && <Skeleton height={250} className="w-full rounded-lg" />}
      <img
        src={src}
        alt="Gallery"
        onLoad={() => setIsLoaded(true)}
        className={`w-full h-auto transition-transform duration-300 rounded-md ${
          isLoaded ? "group-hover:scale-105" : "hidden"
        }`}
      />

      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-between p-4 text-white">
        <div className="flex justify-end gap-2">
          <button className="btn btn-sm btn-circle btn-ghost text-white hover:bg-white/20">
            <FiHeart size={18} />
          </button>
          <button className="btn btn-sm btn-circle btn-ghost text-white hover:bg-white/20">
            <FiPlus size={18} />
          </button>
        </div>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-2">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-8 h-8 rounded-full border border-white"
            />
            <span className="text-sm font-medium">{user.name}</span>
          </div>
          <button className="btn btn-sm btn-circle btn-ghost text-white hover:bg-white/20">
            <FiDownload size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
export default ImageCard;
