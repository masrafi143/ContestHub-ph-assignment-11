import React, { useState } from "react";

const AboutContest = () => {
  const [openIndex, setOpenIndex] = useState(null);

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
        "Depending on contest rules—automatic scoring, manual selection, or voting.",
    },
  ];

  const toggleAccordion = (i) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <div className="min-h-screen w-11/12 mx-auto py-10 transition bg-white dark:bg-gray-900 dark:text-white">
      {/* HEADER */}
      <h1 className="text-3xl md:text-5xl font-bold text-primary text-center mb-6">
        About ContestHub
      </h1>

      <p className="text-gray-600 dark:text-gray-300 text-center max-w-3xl mx-auto mb-10">
        ContestHub is a modern contest creation and participation platform,
        designed for creators and users to run competitions, track progress,
        manage winners, and enjoy real-time interactive features.
      </p>

      {/* ABOUT CARDS */}
      <div className="grid md:grid-cols-2 gap-8 mt-8">
        <div className="p-6 bg-base-200 dark:bg-gray-800 rounded-xl shadow-md border border-base-300 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-primary mb-3">🎯 Our Mission</h2>
          <p className="text-gray-700 dark:text-gray-300">
            To make contest creation simple, engaging, and transparent for
            everyone—from small communities to large organizations.
          </p>
        </div>

        <div className="p-6 bg-base-200 dark:bg-gray-800 rounded-xl shadow-md border border-base-300 dark:border-gray-700">
          <h2 className="text-xl font-semibold text-primary mb-3">⚡ Why ContestHub?</h2>
          <ul className="list-disc ml-5 text-gray-700 dark:text-gray-300 space-y-1">
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
      <h2 className="text-3xl font-bold text-center text-primary mt-16 mb-8">
        Frequently Asked Questions
      </h2>

      <div className="max-w-3xl mx-auto space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border rounded-xl overflow-hidden bg-base-200 dark:bg-gray-800 dark:border-gray-700"
          >
            {/* Accordion Header */}
            <button
              onClick={() => toggleAccordion(index)}
              className="w-full text-left px-5 py-4 font-semibold flex justify-between items-center"
            >
              <span>{index + 1}. {faq.question}</span>

              <span className="text-xl">
                {openIndex === index ? "−" : "+"}
              </span>
            </button>

            {/* Accordion Body */}
            {openIndex === index && (
              <div className="px-5 pb-4 text-gray-700 dark:text-gray-300">
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
