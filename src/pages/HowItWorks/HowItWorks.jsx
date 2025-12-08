import React from "react";

const HowItWorks = () => {
  return (
    <div className="min-h-screen w-11/12 mx-auto py-10">

      {/* ================== HOW IT WORKS ================== */}
      <h1 className="text-3xl md:text-5xl font-bold text-primary text-center mb-6">
        How ContestHub Works
      </h1>

      <p className="text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-12">
        Whether you're a creator or a participant, ContestHub makes the contest
        experience smooth, fast, and user-friendly. Here’s everything you need
        to get started.
      </p>

      <div className="space-y-8">
        {/* Step 1 */}
        <div className="p-6 bg-base-200 dark:bg-gray-800 rounded-xl border border-base-300 dark:border-gray-700 shadow">
          <h2 className="text-xl font-semibold text-primary mb-2">
            1. Create Your Account
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Sign up using email/password or Google login. Your profile helps us
            personalize your contest experience.
          </p>
        </div>

        {/* Step 2 */}
        <div className="p-6 bg-base-200 dark:bg-gray-800 rounded-xl border border-base-300 dark:border-gray-700 shadow">
          <h2 className="text-xl font-semibold text-primary mb-2">
            2. Explore or Create Contests
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Join contests created by others, or create your own contest using
            the Creator Dashboard.
          </p>
        </div>

        {/* Step 3 */}
        <div className="p-6 bg-base-200 dark:bg-gray-800 rounded-xl border border-base-300 dark:border-gray-700 shadow">
          <h2 className="text-xl font-semibold text-primary mb-2">
            3. Participate & Submit
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Submit entries before deadlines. Get instant feedback, status
            updates, and notifications.
          </p>
        </div>

        {/* Step 4 */}
        <div className="p-6 bg-base-200 dark:bg-gray-800 rounded-xl border border-base-300 dark:border-gray-700 shadow">
          <h2 className="text-xl font-semibold text-primary mb-2">
            4. Results & Rewards
          </h2>
          <p className="text-gray-700 dark:text-gray-300">
            Winners are selected based on contest rules. Leaderboards ensure
            transparency and trust.
          </p>
        </div>
      </div>

      {/* ================== CONTACT US ================== */}
      <div className="w-full mx-auto py-16  bg-white dark:bg-gray-900 dark:text-white transition">
        <h1 className="text-3xl md:text-5xl font-bold text-primary text-center mb-6">
          Contact Us
        </h1>

        <p className="text-center text-gray-600 dark:text-gray-300 max-w-xl mx-auto mb-10">
          Have questions, feedback, or partnership ideas? Reach out to us
          anytime!
        </p>

        <form className="max-w-xl mx-auto p-6 rounded-xl shadow-xl bg-base-100 dark:bg-gray-800 border border-base-300 dark:border-gray-700 space-y-5">
          {/* Name */}
          <div>
            <label className="block mb-1 font-semibold">Your Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:outline-primary"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block mb-1 font-semibold">Your Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:outline-primary"
            />
          </div>

          {/* Message */}
          <div>
            <label className="block mb-1 font-semibold">Message</label>
            <textarea
              rows="5"
              placeholder="Write your message..."
              className="w-full p-3 rounded-lg border dark:bg-gray-700 dark:border-gray-600 focus:outline-primary"
            ></textarea>
          </div>

          {/* Submit */}
          <button className="w-full py-3 rounded-lg bg-primary text-white font-semibold hover:opacity-90 transition">
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
};

export default HowItWorks;
