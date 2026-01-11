import React from "react";
import useAuth from "../../hooks/useAuth";

const stats = [
  { label: "Active Users", value: "12K+" },
  { label: "Contests Hosted", value: "540+" },
  { label: "Submissions", value: "38K+" },
  { label: "Prizes Awarded", value: "$120K+" },
];

const Statistics = () => {
  const { dark } = useAuth();

  return (
    <section className="py-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-4 gap-8 text-center px-6">
        {stats.map((s, i) => (
          <div
            key={i}
            className={`p-8 rounded-2xl border backdrop-blur-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-xl
              ${
                dark
                  ? "bg-white/10 border-white/20 text-white"
                  : "bg-white border-gray-200 text-gray-800"
              }`}
          >
            <h3 className="text-4xl font-bold text-indigo-500">{s.value}</h3>
            <p className={dark ? "text-gray-300 mt-2" : "text-gray-600 mt-2"}>
              {s.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Statistics;
