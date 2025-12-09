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
      if (!res.ok) return false;
      const data = await res.json();
      return Array.isArray(data) && data.length > 0;
    } catch (err) {
      console.error("Error checking email:", err);
      return false;
    }
  };

  const saveNewUser = async (userObj) => {
    try {
      const res = await fetch("http://localhost:3000/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userObj),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(txt || "Failed to save user");
      }
      return await res.json();
    } catch (err) {
      console.error("Error saving user:", err);
      throw err;
    }
  };

  const handleGoogleLogin = () => {
    signInWithGoogle()
      .then(async (result) => {
        if (!result?.user?.email) {
          toast.error("Google did not return an email.");
          return;
        }

        const googleUser = {
          name: result.user.displayName || "",
          email: result.user.email,
          image: result.user.photoURL || "",
          role: "user", // default role for new users
        };

        try {
          const exists = await checkDuplicateEmail(googleUser.email);

          if (!exists) {
            await saveNewUser(googleUser);
            toast.success("New user added to DB via Google!");
          } else {
            toast.info("Welcome back!");
          }

          // navigate to original route or home
          const dest = location?.state?.from || "/";
          navigate(dest);
        } catch (err) {
          toast.error("Failed to save user to DB.");
        }
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
        {/* svg icon */}
        <svg aria-label="Google logo" width="16" height="16" viewBox="0 0 512 512">
          <g>
            <path d="m0 0H512V512H0" fill="#fff"></path>
            <path fill="#34a853" d="M153 292c30 82 118 95 171 60h62v48A192 192 0 0190 341"></path>
            <path fill="#4285f4" d="m386 400a140 175 0 0053-179H260v74h102q-7 37-38 57"></path>
            <path fill="#fbbc02" d="m90 341a208 200 0 010-171l63 49q-12 37 0 73"></path>
            <path fill="#ea4335" d="m153 219c22-69 116-109 179-50l55-54c-78-75-230-72-297 55"></path>
          </g>
        </svg>
        Login with Google
      </button>
    </div>
  );
};

export default SocialLogin;
