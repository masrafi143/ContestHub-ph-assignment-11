import React from "react";
import useAuth from "../../hooks/useAuth";

const testimonials = [
  { name: "Sarah", text: "Amazing experience! Highly recommend." },
  { name: "John", text: "The contests are fun and rewarding." },
  { name: "Ayesha", text: "Very smooth platform and great support." },
];

const Testimonials = () => {
  const { dark } = useAuth();

  return (
    <section className="py-20">
      <h2
        className={`text-3xl font-bold text-center mb-12 ${
          dark ? "text-white" : "text-gray-800"
        }`}
      >
        What Users Say
      </h2>

      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8 px-6">
        {testimonials.map((t, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl border backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
              ${
                dark
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-white border-gray-200 text-gray-800"
              }`}
          >
            <p className={dark ? "text-gray-300 mb-4" : "text-gray-600 mb-4"}>
              “{t.text}”
            </p>
            <h4 className="font-semibold text-indigo-500">{t.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
