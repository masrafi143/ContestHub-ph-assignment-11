import React from "react";
import useAuth from "../../hooks/useAuth";

const Features = () => {
  const { dark } = useAuth();

  const features = [
    { title: "Secure Platform", desc: "Fully protected and trusted system" },
    { title: "Live Contests", desc: "Real-time contest participation" },
    { title: "Instant Results", desc: "Winner announced immediately" },
    { title: "Global Access", desc: "Join from anywhere in the world" },
  ];

  return (
    <section className="py-20">
      <h2
        className={`text-3xl font-bold text-center mb-12 ${
          dark ? "text-white" : "text-gray-800"
        }`}
      >
        Why Choose Us
      </h2>

      <div className="grid md:grid-cols-4 gap-8 px-6 max-w-7xl mx-auto">
        {features.map((f, i) => (
          <div
            key={i}
            className={`p-6 rounded-2xl backdrop-blur-lg border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
              ${
                dark
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-white/70 border-gray-200 text-gray-800"
              }`}
          >
            <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
            <p className={dark ? "text-gray-300" : "text-gray-600"}>
              {f.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Features;
