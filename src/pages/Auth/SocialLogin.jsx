import React from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const { signInWithGoogle } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  // Check if user exists in DB
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

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(async (result) => {
        const googleUser = {
          name: result.user.displayName,
          email: result.user.email,
          image: result.user.photoURL,
        };

        // Check if user already exists in DB
        const exists = await checkDuplicateEmail(googleUser.email);

        if (!exists) {
          // Save to DB only if new user
          await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(googleUser),
          });
          toast.success("New user added to DB via Google!");
        } else {
          toast.info("Welcome back!");
        }

        navigate(location?.state || "/");
      })
      .catch((error) => {
        console.error(error);
        toast.error("Google Sign-in failed!");
      });
  };

  return (
    <div className="text-center mt-4">
      <p>OR</p>
      <button
        onClick={handleGoogleLogin}
        className="btn bg-white text-black border-[#e5e5e5] mt-2 flex items-center justify-center gap-2"
      >
        <svg
          aria-label="Google logo"
          width="16"
          height="16"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 512 512"
        >
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path
              fill="#34a853"
              d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"
            ></path>
            <path
              fill="#4285f4"
              d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"
            ></path>
            <path
              fill="#fbbc02"
              d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"
            ></path>
            <path
              fill="#ea4335"
              d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"
            ></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
