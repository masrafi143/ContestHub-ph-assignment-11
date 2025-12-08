import React, { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router";
import { AuthContext } from "../../provider/AuthProvider";
import SocialLogin from "./SocialLogin";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { toast } from "react-toastify";

const Register = () => {
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const handleRegister = async (data) => {
    const { name, email, password, photoURL } = data;
    console.log(data)

    try {
      // 1️⃣ Create user in Firebase
      const result = await createUser(email, password);

      // 2️⃣ Update Firebase profile
      await updateUserProfile({ displayName: name, photoURL: photoURL || "" });

      // 3️⃣ Save user info in DB
      const userData = {
        name,
        email,
        image: photoURL || "",
      };

      // Check if user already exists in DB
      const resCheck = await fetch(`http://localhost:3000/users?email=${email}`);
      const existingUsers = await resCheck.json();
      if (existingUsers.length === 0) {
        await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData),
        });
      }

      toast.success("Registration successful!");
      navigate(location?.state || "/");
    } catch (error) {
      console.error("Registration error:", error);
      toast.error("Registration failed. Try again!");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-base-200 px-4">
      <div className="w-full max-w-md bg-base-100 shadow-xl rounded-2xl p-8 border border-base-300">

        <h2 className="text-3xl font-bold text-center mb-6 text-primary">
          Register for ContestHub
        </h2>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-3">
          <fieldset className="fieldset space-y-2">

            {/* Name */}
            <label className="label font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Your Name"
              className="input input-bordered w-full"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            {/* Email */}
            <label className="label font-medium">Email</label>
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            {/* Password */}
            <label className="label font-medium">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input input-bordered w-full"
                {...register("password", { 
                  required: "Password is required", 
                  minLength: { value: 6, message: "Password must be at least 6 characters" } 
                })}
              />
              <button 
                onClick={togglePassword} 
                className="btn btn-xs absolute top-2 right-4 md:right-6 z-50"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            {/* Photo URL */}
            <label className="label font-medium">Profile Photo URL</label>
            <input
              type="text"
              placeholder="Photo URL (optional)"
              className="input input-bordered w-full"
              {...register("photoURL")}
            />

            {/* Submit Button */}
            <button className="btn btn-primary w-full mt-2">Register</button>
          </fieldset>

          {/* Login Link */}
          <p className="text-center mt-3 text-sm">
            Already have an account?{" "}
            <Link
              state={location.state}
              to="/login"
              className="text-primary font-medium underline"
            >
              Login
            </Link>
          </p>
        </form>

        <div className="mt-6">
          <SocialLogin />
        </div>
      </div>
    </div>
  );
};

export default Register;
