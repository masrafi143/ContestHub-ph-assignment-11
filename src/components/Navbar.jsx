import React from "react";
import { Link, NavLink } from "react-router";
import { FaMoon, FaSun } from "react-icons/fa";
import useAuth from "../hooks/useAuth";

const Navbar = () => {
  const { user, dbUser, logOut, dark, setDark } = useAuth();
  console.log(user)
  console.log(dbUser)
  const demoUser = {
    image:
      "https://imgs.search.brave.com/vLZ44Uli4ZlkgAjdMiftogg6vX7--GvMQWTk4ZDQ8zc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmVkZGl0c3RhdGlj/LmNvbS9hdmF0YXJz/L2RlZmF1bHRzL3Yy/L2F2YXRhcl9kZWZh/dWx0XzcucG5n",
  };

  const profileImage = dbUser?.image || demoUser.image;
  const displayName = dbUser?.name;
  const displayEmail = dbUser?.email;

  const handleToggleMode = () => setDark(!dark);
  const handleLogout = () => logOut().catch((err) => console.log(err));

  const links = (
    <>
      <li><NavLink to="/">Home</NavLink></li>
      <li><NavLink to="/all-contests">All Contests</NavLink></li>
      <li><NavLink to="/leaderboard">Leaderboard</NavLink></li>
      <li><NavLink to="/about">About</NavLink></li>
      <li><NavLink to="/how-it-works">How it works</NavLink></li>
      <li><NavLink to="/add-contest">Add Contest</NavLink></li>
      <li><NavLink to="/my-contests">My Contest</NavLink></li>
      <li><NavLink to="/manage-contests">Manage Contest</NavLink></li>
      <li><NavLink to="/manage-users">Manage Users</NavLink></li>
      <li><NavLink to="/creator">Contest Creator</NavLink></li>
      <li><NavLink to="/approve-creators">Approve Creators</NavLink></li>
    </>
  );

  return (
    <nav className={`shadow-sm transition-colors duration-300 ${dark ? "bg-gray-900 text-white" : "bg-base-300 text-gray-900"}`}>
      <div className="navbar md:w-11/12 md:mx-auto">

        {/* Left section */}
        <div className="navbar-start">
          {/* Mobile dropdown */}
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul tabIndex={0} className={`menu menu-sm dropdown-content mt-3 z-[100] p-2 shadow rounded-box w-52 nav-links ${dark ? "bg-gray-800 text-white" : "bg-base-100 text-gray-900"}`}>
              {links}
            </ul>
          </div>

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 text-xl font-bold">
            <img
              src={dark ? "/dark-mode-logo.png" : "/contesthub-full-logo.png"}
              className="w-70 h-20"
              alt="ContestHub logo"
            />
          </Link>
        </div>

        {/* Desktop Links */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 space-x-4 font-semibold nav-links">{links}</ul>
        </div>

        {/* Right section */}
        <div className="navbar-end flex items-center gap-3">

          {/* Theme toggle */}
          <button onClick={handleToggleMode} className="p-2 rounded-full bg-base-200 text-base-content">
            {dark ? <FaSun /> : <FaMoon />}
          </button>

          {/* Auth section */}
          {dbUser ? (
            <div className="dropdown dropdown-end">
              <div tabIndex={0} role="button" className="cursor-pointer">
                <img src={dbUser?.image || demoUser.image} alt="Profile" className="rounded-full h-10 w-10 object-cover border-2 border-primary" />
              </div>
              <ul tabIndex={0} className={`dropdown-content menu rounded-box w-56 p-2 shadow mt-2 ${dark ? "bg-gray-800 text-white" : "bg-base-100 text-gray-900"}`}>
                <li className="text-center font-bold text-lg">{displayName}</li>
                <li className="text-center text-sm text-primary">{displayEmail}</li>
                <li className="mt-2">
                  <button onClick={handleLogout} className="btn bg-primary text-white w-full rounded-full">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn bg-primary text-white hover:text-primary hover:bg-yellow-400">Login</Link>
              <Link to="/register" className="btn bg-yellow-400 hover:text-white hover:bg-primary">Register</Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
