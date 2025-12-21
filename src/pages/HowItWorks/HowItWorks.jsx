import React from "react";
import useAuth from "../../hooks/useAuth";

const HowItWorks = () => {
  const { dark } = useAuth();

  return (
    <div
      className={`min-h-screen w-11/12 mx-auto py-14 transition-colors duration-300
        ${dark ? "bg-[#0b132b] text-gray-100" : "bg-base-100 text-gray-900"}`}
    >
      {/* ================== HOW IT WORKS ================== */}
      <h1
        className={`text-3xl md:text-5xl font-bold text-center mb-6
          ${dark ? "text-blue-300" : "text-primary"}`}
      >
        How ContestHub Works
      </h1>

      <p
        className={`text-center max-w-3xl mx-auto mb-14
          ${dark ? "text-gray-300" : "text-gray-600"}`}
      >
        Whether you're a creator or a participant, ContestHub makes the contest
        experience smooth, fast, and user-friendly. Here’s everything you need
        to get started.
      </p>

      {/* STEPS */}
      <div className="space-y-8 max-w-4xl mx-auto">
        {[
          {
            title: "Create Your Account",
            desc:
              "Sign up using email/password or Google login. Your profile helps us personalize your contest experience.",
          },
          {
            title: "Explore or Create Contests",
            desc:
              "Join contests created by others, or create your own contest using the Creator Dashboard.",
          },
          {
            title: "Participate & Submit",
            desc:
              "Submit entries before deadlines. Get instant feedback, status updates, and notifications.",
          },
          {
            title: "Results & Rewards",
            desc:
              "Winners are selected based on contest rules. Leaderboards ensure transparency and trust.",
          },
        ].map((step, i) => (
          <div
            key={i}
            className={`p-7 rounded-xl border shadow-md transition-colors
              ${dark
                ? "bg-[#1c2541] border-gray-700"
                : "bg-base-200 border-base-300"}`}
          >
            <h2
              className={`text-xl font-semibold mb-2
                ${dark ? "text-blue-300" : "text-primary"}`}
            >
              {i + 1}. {step.title}
            </h2>
            <p className={dark ? "text-gray-300" : "text-gray-700"}>
              {step.desc}
            </p>
          </div>
        ))}
      </div>

      {/* ================== CONTACT US ================== */}
      <div
        className={`w-full mt-24 py-16 transition-colors
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
            ${dark
              ? "bg-[#1c2541] border-gray-700"
              : "bg-base-100 border-base-300"}`}
        >
          {/* Name */}
          <div>
            <label className="block mb-1 font-semibold">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2
                ${dark
                  ? "bg-[#233554] border-gray-600 text-white focus:ring-blue-400"
                  : "bg-white border-gray-300 focus:ring-primary"}`}
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold">Your Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2
                ${dark
                  ? "bg-[#233554] border-gray-600 text-white focus:ring-blue-400"
                  : "bg-white border-gray-300 focus:ring-primary"}`}
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 font-semibold">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className={`w-full p-3 rounded-lg border focus:outline-none focus:ring-2
                ${dark
                  ? "bg-[#233554] border-gray-600 text-white focus:ring-blue-400"
                  : "bg-white border-gray-300 focus:ring-primary"}`}
            />
          </div>

          {/* Submit */}
          <button
            className={`w-full py-3 rounded-lg font-semibold transition
              ${dark
                ? "bg-blue-500 hover:bg-blue-600 text-white"
                : "bg-primary hover:opacity-90 text-white"}`}
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default HowItWorks;
