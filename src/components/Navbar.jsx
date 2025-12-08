import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router";
import { FaMoon, FaSun } from "react-icons/fa";

const Navbar = ({ user, handleLogout }) => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  // Apply theme to HTML via data-theme (DaisyUI Standard)
  useEffect(() => {
    document.querySelector("html").setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="w-full shadow sticky top-0 z-50 bg-base-300">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            src={
              theme === "dark"
                ? "/dark-mode-logo.png"
                : "/contesthub-full-logo.png"
            }
            alt="logo"
            className="w-70 h-20"
          />
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 nav-links">
          <NavLink
            to="/"
            className="text-purple-700 md: font-bold hover:text-primary"
          >
            Home
          </NavLink>

          <NavLink
            to="/all-contests"
            className="text-purple-700 md: font-bold hover:text-primary"
          >
            All Contests
          </NavLink>

          <NavLink
            to="/leaderboard"
            className="text-purple-700 md: font-bold hover:text-primary"
          >
            Leaderboard
          </NavLink>

          {/* Theme Toggle */}
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 rounded-full bg-base-200 text-base-content"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {/* Profile Section */}
          {user ? (
            <div className="relative group">
              <img
                src={user.photoURL}
                alt="profile"
                className="w-10 h-10 rounded-full cursor-pointer border"
              />
              {/* Dropdown */}
              <div className="absolute right-0 mt-2 hidden group-hover:block bg-base-200 dark:bg-gray-800 shadow-lg rounded p-3 w-40">
                <p className="text-sm font-semibold text-base-content mb-2">
                  {user.displayName}
                </p>
                <Link
                  to="/dashboard"
                  className="block py-1 text-base-content hover:text-primary"
                >
                  Dashboard
                </Link>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left py-1 text-red-500"
                >
                  Logout
                </button>
              </div>
            </div>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 rounded bg-primary text-white hover:bg-secondary"
            >
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <button className="text-gray-900 dark:text-white text-2xl">☰</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
