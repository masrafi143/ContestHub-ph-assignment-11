import React, { useContext, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../../provider/AuthProvider";
import { useForm } from "react-hook-form";
import { toast, ToastContainer } from "react-toastify";
import SocialLogin from "./SocialLogin";

const Login = () => {
  const { signInUser, signInWithGoogle, forgotPassword } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();
  const emailRef = useRef();
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();

  const togglePassword = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  const checkDuplicateEmail = async (email) => {
    try {
      const res = await fetch(`http://localhost:3000/users?email=${email}`);
      const data = await res.json();
      return data.length > 0;
    } catch (err) {
      console.error("Error checking email:", err);
      return false;
    }
  };

  const onSubmit = (data) => {
    const { email, password } = data;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).{6,}$/;

    if (!passwordPattern.test(password)) {
      toast.error("Password must have uppercase, lowercase, special char & 6+ chars.");
      return;
    }

    signInUser(email, password)
      .then(() => {
        toast.success("Login successful!");
        navigate(location?.state || "/");
      })
      .catch((err) => {
        console.error(err.message);
        toast.error("Invalid email or password!");
      });
  };

  const handleGoogleSignIn = async () => {
    signInWithGoogle()
      .then(async (result) => {
        const googleUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        const exists = await checkDuplicateEmail(googleUser.email);
        if (!exists) {
          await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(googleUser),
          });
          toast.success("New user added via Google!");
        } else {
          toast.info("Welcome back!");
        }

        navigate(location?.state || "/");
      })
      .catch((err) => {
        console.error(err);
        toast.error("Google Sign-in failed!");
      });
  };

  const handleForgotPassword = () => {
    const email = emailRef.current.value;
    forgotPassword(email)
      .then(() => alert("Check your email to reset password."))
      .catch((err) => toast.error(err.message));
  };

  return (
    <div className="flex justify-center items-center py-5 md:py-10">
      <div className="card bg-base-100 w-full max-w-sm shadow-2xl">
        <div className="card-body">
          <h2 className="font-bold text-center text-2xl mb-4">Login Your Account</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="label">Email</label>
            <input
              ref={emailRef}
              type="email"
              placeholder="Email"
              className="input text-gray-600"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <label className="label">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                className="input text-gray-600"
                {...register("password", { required: "Password is required" })}
              />
              <button onClick={togglePassword} className="btn btn-xs absolute top-2 right-4 md:right-6 z-50">
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            <div className="text-right">
              <a onClick={handleForgotPassword} className="link link-hover text-sm">Forgot password?</a>
            </div>

            <button className="btn btn-secondary text-white mt-4 w-full">Login</button>
          </form>

          <SocialLogin/>

          <p className="mt-4 text-center">
            Don’t have an account?{" "}
            <Link to="/register" className="text-blue-500 underline">Register</Link>
          </p>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
