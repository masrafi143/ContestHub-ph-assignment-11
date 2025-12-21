import { Link } from "react-router";
import { FaFacebook, FaLinkedinIn } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Footer = () => {
  const { dark } = useAuth();

  // Conditional classes
  const bgClass = dark ? "bg-[#0b132b]" : "bg-gray-50";
  const textClass = dark ? "text-gray-300" : "text-gray-600";
  const headingClass = dark ? "text-gray-200" : "text-gray-800";
  const borderClass = dark ? "border-gray-700" : "border-gray-200";
  const fbClass = dark ? "text-blue-400" : "text-blue-600";
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
          <h3 className={`text-lg font-semibold mb-3 transition-colors ${headingClass}`}>
            Quick Links
          </h3>
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

        {/* Social Links */}
        <div>
          <h3 className={`text-lg font-semibold mb-3 transition-colors ${headingClass}`}>
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
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className={`hover:bg-blue-700 transition-colors rounded-full ${dark ? "hover:bg-blue-500" : ""}`}
            >
              <FaLinkedinIn className={`w-10 h-10 ${linkedinBg} text-white p-1 rounded-full`} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className={`border-t py-4 text-center transition-colors ${borderClass}`}>
        <p className={`${textClass} text-sm transition-colors`}>
          © 2025 ContestHub — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
