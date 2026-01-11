import React from "react";
import useAuth from "../../hooks/useAuth";

const ContactUs = () => {
  const { dark } = useAuth();
  return (
    <div>
      {/* ================== CONTACT US ================== */}
      <div
        className={`w-full py-16 transition-colors
          ${dark ? "bg-[#0e1a3a]" : "bg-base-200"}`}
      >
        <h1
          className={`text-3xl md:text-5xl font-bold text-center mb-6
            ${dark ? "text-blue-300" : "text-primary"}`}
        >
          Contact Us
        </h1>

        <p
          className={`text-center max-w-xl mx-auto mb-12
            ${dark ? "text-gray-300" : "text-gray-600"}`}
        >
          Have questions, feedback, or partnership ideas? Reach out to us
          anytime.
        </p>

        <form
          className={`max-w-xl mx-auto p-8 rounded-xl shadow-xl border space-y-6
            ${
              dark
                ? "bg-[#1c2541] border-gray-700"
                : "bg-base-100 border-base-300"
            }`}
        >
          {/* Name */}
          <div>
            <label className="block mb-1 font-semibold">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2
                ${
                  dark
                    ? "bg-[#233554] border-gray-600 text-white focus:ring-blue-400"
                    : "bg-white border-gray-300 focus:ring-primary"
                }`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold">Your Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2
                ${
                  dark
                    ? "bg-[#233554] border-gray-600 text-white focus:ring-blue-400"
                    : "bg-white border-gray-300 focus:ring-primary"
                }`}
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 font-semibold">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2
                ${
                  dark
                    ? "bg-[#233554] border-gray-600 text-white focus:ring-blue-400"
                    : "bg-white border-gray-300 focus:ring-primary"
                }`}
            />
          </div>

          {/* Submit */}
          <button
            className={`w-full py-3 rounded-lg font-semibold transition
              ${
                dark
                  ? "bg-blue-500 hover:bg-blue-600 text-white"
                  : "bg-primary hover:opacity-90 text-white"
              }`}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default ContactUs;
