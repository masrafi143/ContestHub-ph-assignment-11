import React from "react";
import { useLocation, useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import { toast } from "react-toastify";

const SocialLogin = () => {
  const { signInWithGoogle, dark } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const checkDuplicateEmail = async (email) => {
    try {
      const res = await fetch(`https://contest-hub-server-gold.vercel.app/users?email=${email}`);
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
      const res = await fetch("https://contest-hub-server-gold.vercel.app/users", {
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
          image:
            result.user.photoURL ||
            "https://imgs.search.brave.com/vLZ44Uli4ZlkgAjdMiftogg6vX7--GvMQWTk4ZDQ8zc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/cmVkZGl0c3RhdGlj/LmNvbS9hdmF0YXJz/L2RlZmF1bHRzL3Yy/L2F2YXRhcl9kZWZh/dWx0XzcucG5n",
        };

        try {
          const exists = await checkDuplicateEmail(googleUser.email);

          if (!exists) {
            await saveNewUser(googleUser);
            toast.success("New user added via Google!");
          } else {
            toast.info("Welcome back!");
          }

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
      <p className="mb-2 opacity-80">OR</p>
      <button
        onClick={handleGoogleLogin}
        className={`
          flex items-center justify-center gap-2 w-full py-2 rounded-lg font-medium transition
          ${dark
            ? "bg-gray-800 text-white border border-gray-700 hover:bg-gray-700"
            : "bg-white text-gray-800 border border-gray-300 hover:bg-gray-100"
          }
        `}
      >
        <svg
          aria-label="Google logo"
          width="20"
          height="20"
          viewBox="0 0 512 512"
          className="inline-block"
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
