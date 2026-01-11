import { Link } from "react-router";
import { FaFacebook, FaLinkedinIn, FaTwitter } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Footer = () => {
  const { dark } = useAuth();

  // Conditional classes
  const bgClass = dark ? "bg-[#0b132b]" : "bg-gray-50";
  const textClass = dark ? "text-gray-300" : "text-gray-600";
  const headingClass = dark ? "text-gray-200" : "text-gray-800";
  const borderClass = dark ? "border-gray-700" : "border-gray-200";
  const fbClass = dark ? "text-blue-400" : "text-blue-600";
  const twitterBg = dark ? "bg-blue-400" : "bg-blue-600";
  const linkedinBg = dark ? "bg-blue-400" : "bg-blue-600";

  return (
    <footer className={`transition-colors ${bgClass}`}>
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 text-center md:text-left">
        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <img
            src={dark ? "/dark-mode-logo.png" : "/contesthub-full-logo.png"}
            className="w-40"
            alt="logo"
          />
          <p className={`${textClass} text-sm transition-colors`}>
            Empowering creativity through contests and challenges.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10">
            {/* Column 1 */}
            <div>
              <h4
                className={`text-sm font-semibold mb-3 uppercase tracking-wide ${headingClass}`}
              >
                Explore
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/"
                    className={`${textClass} hover:text-blue-500 transition-colors`}
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/all-contests"
                    className={`${textClass} hover:text-blue-500 transition-colors`}
                  >
                    All Contests
                  </Link>
                </li>
                <li>
                  <Link
                    to="/leaderboard"
                    className={`${textClass} hover:text-blue-500 transition-colors`}
                  >
                    Leaderboard
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 2 */}
            <div>
              <h4
                className={`text-sm font-semibold mb-3 uppercase tracking-wide ${headingClass}`}
              >
                Company
              </h4>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/about"
                    className={`${textClass} hover:text-blue-500 transition-colors`}
                  >
                    About
                  </Link>
                </li>
                <li>
                  <Link
                    to="/how-it-works"
                    className={`${textClass} hover:text-blue-500 transition-colors`}
                  >
                    How it works
                  </Link>
                </li>
                <li>
                  <Link
                    to="/privacy-policy"
                    className={`${textClass} hover:text-blue-500 transition-colors`}
                  >
                    Privacy Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div>
          <h3
            className={`text-lg font-semibold mb-3 transition-colors ${headingClass}`}
          >
            Follow Us
          </h3>
          <div className="flex items-center justify-center md:justify-start gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-blue-500 transition-colors"
            >
              <FaFacebook className={`w-10 h-10 ${fbClass}`} />
            </a>

            <a
              href="https://www.linkedin.com/in/mohammad-masrafi/"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:bg-blue-700 transition-colors rounded-full ${
                dark ? "hover:bg-blue-500" : ""
              }`}
            >
              <FaLinkedinIn
                className={`w-10 h-10 ${linkedinBg} text-white p-1 rounded-full`}
              />
            </a>
            <a
              href="https://x.com/masrafi_404"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:bg-blue-700 transition-colors rounded-full ${
                dark ? "hover:bg-blue-500" : ""
              }`}
            >
              <FaTwitter
                className={`w-10 h-10 ${twitterBg} text-white p-1 rounded-full`}
              />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div
        className={`border-t py-4 text-center transition-colors ${borderClass}`}
      >
        <p className={`${textClass} text-sm transition-colors`}>
          © 2025 ContestHub — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
