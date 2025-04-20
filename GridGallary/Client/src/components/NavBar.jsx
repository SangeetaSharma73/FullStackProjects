// components/Navbar.jsx
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch user data from localStorage or make an API call
    const fetchUser = async () => {
      const token = localStorage.getItem("token");

      if (token) {
        const res = await fetch("http://localhost:8000/api/user/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        setUser(data);
      }
    };
    fetchUser();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
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
        {user ? (
          <div className="dropdown dropdown-end">
            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
              <div className="w-10 rounded-full">
                <img src={user.avatar || "default-avatar.png"} alt="avatar" />
              </div>
            </label>
            <ul
              tabIndex={0}
              className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
            >
              <li>
                <a onClick={() => navigate("/profile")}>View Profile</a>
              </li>
              <li>
                <a onClick={handleLogout}>Logout</a>
              </li>
            </ul>
          </div>
        ) : (
          <button
            className="btn btn-md btn-primary"
            onClick={() => navigate("/login")}
          >
            LogIn
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
