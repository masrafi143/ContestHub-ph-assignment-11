import React, {  useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash, FaMoon, FaSun } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import SocialLogin from "./SocialLogin";
import useAuth from "../../hooks/useAuth";

const Login = () => {
  const {
    signInUser,
    forgotPassword,
    dark,
    setDark,
  } = useAuth();

  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const onSubmit = ({ email, password }) => {
    signInUser(email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate(location?.state || "/");
      })
      .catch(() => toast.error("Invalid email or password"));
  };

  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    if (!email) {
      toast.error("Please enter your email first");
      return;
    }
    forgotPassword(email)
      .then(() => toast.success("Password reset email sent"))
      .catch((err) => toast.error(err.message));
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
      {/* Theme toggle */}
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
          Welcome Back
        </h2>
        <p className="text-center text-sm opacity-80 mb-6">
          Login to continue your journey
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Email */}
          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              ref={emailRef}
              type="email"
              placeholder="you@example.com"
              className={`input w-full mt-1 focus:outline-none focus:ring-2
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
                className={`input w-full mt-1 pr-12 focus:outline-none focus:ring-2
                ${
                  dark
                    ? "bg-gray-800 text-white focus:ring-indigo-500"
                    : "bg-gray-100 text-gray-900 focus:ring-indigo-400"
                }`}
                {...register("password", {
                  required: "Password is required",
                })}
              />
              <button
                onClick={togglePassword}
                className="absolute top-3 right-4 text-lg opacity-70 hover:opacity-100"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>

          <div className="text-right">
            <button
              type="button"
              onClick={handleForgotPassword}
              className="text-sm text-indigo-500 hover:underline"
            >
              Forgot password?
            </button>
          </div>

          <button
            className="w-full py-3 rounded-xl font-semibold transition-all
            bg-gradient-to-r from-indigo-500 to-purple-600
            hover:from-indigo-600 hover:to-purple-700 text-white"
          >
            Login
          </button>
        </form>

        <SocialLogin />

        <p className="text-center mt-6 text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-500 font-semibold">
            Register
          </Link>
        </p>
      </div>

      <ToastContainer />
    </div>
  );
};

export default Login;
