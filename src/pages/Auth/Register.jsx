import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import SocialLogin from "./SocialLogin";
import { FaEye, FaEyeSlash, FaMoon, FaSun } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, updateUserProfile, dark, setDark } =
    useContext(AuthContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleRegister = async (data) => {
    const { name, email, password, photoURL } = data;

    try {
      await createUser(email, password);

      await updateUserProfile({
        displayName: name,
        photoURL:
          photoURL ||
          "https://imgs.search.brave.com/vLZ44Uli4ZlkgAjdMiftogg6vX7--GvMQWTk4ZDQ8zc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmVkZGl0c3RhdGlj/LmNvbS9hdmF0YXJz/L2RlZmF1bHRzL3Yy/L2F2YXRhcl9kZWZh/dWx0XzcucG5n",
      });

      const userData = {
        name,
        email,
        image:
          photoURL ||
          "https://imgs.search.brave.com/vLZ44Uli4ZlkgAjdMiftogg6vX7--GvMQWTk4ZDQ8zc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmVkZGl0c3RhdGlj/LmNvbS9hdmF0YXJz/L2RlZmF1bHRzL3Yy/L2F2YXRhcl9kZWZh/dWx0XzcucG5n",
      };

      const res = await fetch(
        `https://contest-hub-server-gold.vercel.app/users?email=${email}`
      );
      const exists = await res.json();

      if (exists.length === 0) {
        await fetch("https://contest-hub-server-gold.vercel.app/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
      }

      toast.success("Registration successful!");
      navigate(location?.state || "/");
    } catch (error) {
      console.error(error);
      toast.error("Registration failed!");
    }
  };

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 transition-colors duration-300
      ${
        dark
          ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
          : "bg-gradient-to-br from-indigo-50 via-white to-blue-100"
      }`}
    >
      {/* Theme Toggle */}
      <button
        onClick={() => setDark(!dark)}
        className="absolute top-6 right-6 p-3 rounded-full backdrop-blur-md shadow-lg
        bg-white/70 dark:bg-gray-800/70 text-gray-800 dark:text-white"
      >
        {dark ? <FaSun /> : <FaMoon />}
      </button>

      <div
        className={`w-full max-w-md rounded-2xl p-8 backdrop-blur-xl transition-all duration-300
        ${
          dark
            ? "bg-gray-900/70 text-white shadow-2xl shadow-black/40"
            : "bg-white/80 text-gray-900 shadow-xl"
        }`}
      >
        <h2 className="text-3xl font-extrabold text-center mb-2">
          Create Account
        </h2>
        <p className="text-center text-sm opacity-80 mb-6">
          Join ContestHub and start competing
        </p>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-4">
          {/* Name */}
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Your name"
              className={`input w-full mt-1 focus:ring-2
              ${
                dark
                  ? "bg-gray-800 text-white focus:ring-indigo-500"
                  : "bg-gray-100 text-gray-900 focus:ring-indigo-400"
              }`}
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="you@example.com"
              className={`input w-full mt-1 focus:ring-2
              ${
                dark
                  ? "bg-gray-800 text-white focus:ring-indigo-500"
                  : "bg-gray-100 text-gray-900 focus:ring-indigo-400"
              }`}
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                className={`input w-full mt-1 pr-12 focus:ring-2
                ${
                  dark
                    ? "bg-gray-800 text-white focus:ring-indigo-500"
                    : "bg-gray-100 text-gray-900 focus:ring-indigo-400"
                }`}
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Minimum 6 characters",
                  },
                })}
              />
              <button
                onClick={togglePassword}
                className="absolute top-3 right-4 opacity-70 hover:opacity-100"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Photo URL */}
          <div>
            <label className="text-sm font-medium">
              Profile Photo URL (optional)
            </label>
            <input
              type="text"
              placeholder="https://image..."
              className={`input w-full mt-1
              ${
                dark
                  ? "bg-gray-800 text-white"
                  : "bg-gray-100 text-gray-900"
              }`}
              {...register("photoURL")}
            />
          </div>

          <button
            className="w-full py-3 rounded-xl font-semibold transition-all
            bg-gradient-to-r from-indigo-500 to-purple-600
            hover:from-indigo-600 hover:to-purple-700 text-white"
          >
            Register
          </button>
        </form>

        <SocialLogin />

        <p className="text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-500 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
