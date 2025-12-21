import React, { useState } from "react";
import useAuth from "../../hooks/useAuth";

const AboutContest = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { dark } = useAuth();

  const faqs = [
    {
      question: "What is ContestHub?",
      answer:
        "ContestHub is a platform where creators can host contests and users can join, submit entries, and win rewards.",
    },
    {
      question: "Is joining contests free?",
      answer: "Yes! Most contests are completely free to participate in.",
    },
    {
      question: "How do I create a contest?",
      answer:
        "After signing in, go to the Creator Dashboard and click “Create Contest.”",
    },
    {
      question: "How are winners selected?",
      answer:
        "Winners are selected based on contest rules such as automatic scoring, manual evaluation, or community voting.",
    },
  ];

  const toggleAccordion = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div
      className={`min-h-screen w-11/12 mx-auto py-14 transition-colors duration-300
        ${dark ? "bg-[#0b132b] text-gray-100" : "bg-base-100 text-gray-900"}`}
    >
      {/* HEADER */}
      <h1
        className={`text-3xl md:text-5xl font-bold text-center mb-6
          ${dark ? "text-blue-300" : "text-primary"}`}
      >
        About ContestHub
      </h1>

      <p
        className={`text-center max-w-3xl mx-auto mb-14
          ${dark ? "text-gray-300" : "text-gray-600"}`}
      >
        ContestHub is a modern contest creation and participation platform,
        designed for creators and users to run competitions, track progress,
        manage winners, and enjoy real-time interactive features.
      </p>

      {/* ABOUT CARDS */}
      <div className="grid md:grid-cols-2 gap-8">
        {/* Mission */}
        <div
          className={`p-7 rounded-xl shadow-md border transition-colors
            ${dark
              ? "bg-[#1c2541] border-gray-700"
              : "bg-base-200 border-base-300"}`}
        >
          <h2
            className={`text-xl font-semibold mb-3
              ${dark ? "text-blue-300" : "text-primary"}`}
          >
            Our Mission
          </h2>
          <p className={dark ? "text-gray-300" : "text-gray-700"}>
            To make contest creation simple, engaging, and transparent for
            everyone—from small communities to large organizations.
          </p>
        </div>

        {/* Why ContestHub */}
        <div
          className={`p-7 rounded-xl shadow-md border transition-colors
            ${dark
              ? "bg-[#1c2541] border-gray-700"
              : "bg-base-200 border-base-300"}`}
        >
          <h2
            className={`text-xl font-semibold mb-3
              ${dark ? "text-blue-300" : "text-primary"}`}
          >
            Why ContestHub?
          </h2>
          <ul
            className={`list-disc ml-5 space-y-1
              ${dark ? "text-gray-300" : "text-gray-700"}`}
          >
            <li>Role-based dashboards (Admin, Creator, User)</li>
            <li>Secure login & Google authentication</li>
            <li>Create, join & manage contests easily</li>
            <li>Responsive dashboard and clean UI</li>
            <li>Real-time updates and notifications</li>
            <li>Leaderboards & fair judging</li>
          </ul>
        </div>
      </div>

      {/* FAQ SECTION */}
      <h2
        className={`text-3xl font-bold text-center mt-20 mb-10
          ${dark ? "text-blue-300" : "text-primary"}`}
      >
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className={`rounded-xl overflow-hidden border transition-colors
              ${dark
                ? "bg-[#1c2541] border-gray-700"
                : "bg-base-200 border-base-300"}`}
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleAccordion(index)}
              className={`w-full px-6 py-4 font-semibold flex justify-between items-center text-left
                hover:bg-opacity-80 transition
                ${dark ? "hover:bg-[#233554]" : "hover:bg-base-300"}`}
            >
              <span>
                {index + 1}. {faq.question}
              </span>
              <span className="text-2xl font-bold">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {/* Accordion Body */}
            {openIndex === index && (
              <div
                className={`px-6 pb-5 leading-relaxed
                  ${dark ? "text-gray-300" : "text-gray-700"}`}
              >
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutContest;
