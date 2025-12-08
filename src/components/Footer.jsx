import { Link } from "react-router";
import { FaFacebook, FaFacebookF, FaLinkedinIn } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-900 mt-16">
      <div className="max-w-7xl mx-auto px-4 py-10 grid md:grid-cols-3 gap-8 text-center md:text-left">

        {/* Logo Section */}
        <div className="flex flex-col items-center md:items-start gap-3">
          <img
            src="/contesthub-full-logo.png"
            className="w-40 dark:hidden"
            alt="logo"
          />
          <img
            src="/dark-mode-logo.png"
            className="w-40 hidden dark:block"
            alt="dark logo"
          />
          <p className="text-gray-600 dark:text-gray-300 text-sm">
            Empowering creativity through contests and challenges.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Quick Links
          </h3>
          <ul className="space-y-2">
            <li>
              <Link
                to="/"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
              >
                Home
              </Link>
            </li>

            <li>
              <Link
                to="/all-contests"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
              >
                All Contests
              </Link>
            </li>

            <li>
              <Link
                to="/leaderboard"
                className="text-gray-600 dark:text-gray-300 hover:text-blue-500"
              >
                Leaderboard
              </Link>
            </li>
          </ul>
        </div>

        {/* Social Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3">
            Follow Us
          </h3>

          <div className="flex items-center justify-center md:justify-start gap-4">
            <a
              href="https://facebook.com"
              target="_blank"
            >
              <FaFacebook className="w-10 h-10 text-blue-600"/>
            </a>

            <a
              href="https://linkedin.com"
              target="_blank"
            >
              <FaLinkedinIn className="w-10 h-10 bg-blue-600 text-white p-1"/>
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t dark:border-gray-700 py-4 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          © 2025 ContestHub — All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
