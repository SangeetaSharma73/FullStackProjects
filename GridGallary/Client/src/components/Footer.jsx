import Logo from "../assets/pixabay.svg";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Footer = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <footer className="border-t border-base-300 mt-10 px-6 py-14">
      <div
        className="max-w-7xl mx-auto flex flex-col md:flex-row md:justify-between gap-10"
        data-aos="fade-up"
      >
        <div className="flex flex-col items-start max-w-sm">
          <img src={Logo} alt="Pixabay Clone" className="w-28 mb-4" />

          <p className="text-sm">
            A free platform for sharing high-quality photos, illustrations, and
            videos. Built to replicate the user experience of Pixabay with a
            modern, responsive UI using React, Tailwind CSS, and DaisyUI.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-8 text-sm">
          <div>
            <span className="footer-title">Explore</span>
            <a className="link link-hover block mt-2">Photos</a>
            <a className="link link-hover block">Videos</a>
            <a className="link link-hover block">Music</a>
            <a className="link link-hover block">Editor’s Choice</a>
          </div>

          <div>
            <span className="footer-title">Community</span>
            <a className="link link-hover block mt-2">Blog</a>
            <a className="link link-hover block">Forum</a>
            <a className="link link-hover block">Challenges</a>
            <a className="link link-hover block">Leaderboard</a>
          </div>

          <div>
            <span className="footer-title">Legal</span>
            <a className="link link-hover block mt-2">License</a>
            <a className="link link-hover block">Terms of Service</a>
            <a className="link link-hover block">Privacy Policy</a>
          </div>
          <div>
            <span className="footer-title">Language</span>
            <select className="select select-sm w-full mt-2">
              <option>English</option>
              <option>Español</option>
              <option>Français</option>
              <option>Deutsch</option>
            </select>

            <span className="footer-title mt-6 block">Subscribe</span>
            <input
              type="email"
              placeholder="Your email"
              className="input input-sm w-full mt-2"
            />
            <button className="btn btn-sm mt-2 w-full">Subscribe</button>
          </div>
        </div>
      </div>

      <div className="mt-12 text-center text-xs">
        <p>
          © {new Date().getFullYear()} Pixabay Clone. Built for educational
          purposes. All photos are credited to their respective owners.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
