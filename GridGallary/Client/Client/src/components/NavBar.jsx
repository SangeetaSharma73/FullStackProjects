import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const onNavigatingToLogin = () => {
    navigate("/login");
  };
  return (
    <nav className="navbar bg-base-100 border-b border-base-200 px-4 md:px-10">
      <div className="navbar-start">
        <a className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-pink-500 to-orange-400 drop-shadow-sm">
          <span className="hidden md:inline-block">🟣 </span>SnapGrid
        </a>
      </div>
      <div className="navbar-end hidden lg:flex gap-5 items-center">
        <a className="link link-hover text-base">Explore</a>
        <a className="link link-hover text-base">Advertise</a>
        <a className="link link-hover text-base">Blog</a>
        <button
          className="btn btn-md btn-primary"
          onClick={onNavigatingToLogin}
        >
          LogIn
        </button>
      </div>

      <div className="navbar-end lg:hidden">
        <button
          className="btn btn-ghost btn-square"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
              }
            />
          </svg>
        </button>
      </div>

      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-base-100 shadow-md px-6 py-4 flex flex-col gap-3 z-50 lg:hidden">
          <a className="link link-hover text-base">Explore</a>
          <a className="link link-hover text-base">Advertise</a>
          <a className="link link-hover text-base">Blog</a>
          <button
            className="btn btn-ghost btn-md w-full"
            onClick={onNavigatingToLogin}
          >
            Log in
          </button>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
