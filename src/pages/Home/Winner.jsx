// src/components/home/Winner.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const Winner = () => {
  const { dark } = useAuth();
  const [stats, setStats] = useState({});
  const [winners, setWinners] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/stats").then((res) => {
      setStats(res.data);
    });

    axios.get("http://localhost:5000/winners/recent").then((res) => {
      setWinners(res.data);
    });
  }, []);

  return (
    <section
      className={`py-20 transition-colors duration-300 ${
        dark ? "" : "bg-gray-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h2
              className={`text-4xl font-extrabold mb-6 ${
                dark ? "text-white" : "text-gray-900"
              }`}
            >
              Our Winners Speak for Us
            </h2>

            <p
              className={`mb-8 text-lg ${
                dark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Thousands of creators have already turned their skills into
              rewards. You could be the next success story.
            </p>

            <div className="grid grid-cols-2 gap-6">
              {/* Total Winners */}
              <div
                className={`p-6 rounded-xl shadow transition-colors ${
                  dark ? "bg-[#1a1f3d]" : "bg-white"
                }`}
              >
                <h3
                  className={`text-3xl font-bold ${
                    dark ? "text-indigo-400" : "text-indigo-600"
                  }`}
                >
                  {stats.totalWinners || 0}+
                </h3>
                <p
                  className={`${
                    dark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Total Winners
                </p>
              </div>

              {/* Prize Money */}
              <div
                className={`p-6 rounded-xl shadow transition-colors ${
                  dark ? "bg-[#1a1f3d]" : "bg-white"
                }`}
              >
                <h3
                  className={`text-3xl font-bold ${
                    dark ? "text-indigo-400" : "text-indigo-600"
                  }`}
                >
                  ${stats.totalPrize || 0}+
                </h3>
                <p
                  className={`${
                    dark ? "text-gray-300" : "text-gray-600"
                  }`}
                >
                  Prize Money Awarded
                </p>
              </div>
            </div>
          </div>

          {/* Winner Cards */}
          <div className="grid grid-cols-2 gap-6">
            {winners.slice(0, 4).map((winner) => (
              <div
                key={winner._id}
                className={`p-5 rounded-xl shadow text-center transition-colors ${
                  dark ? "bg-[#1a1f3d]" : "bg-white"
                }`}
              >
                <img
                  src={winner.image}
                  alt={winner.name}
                  className="w-20 h-20 mx-auto rounded-full object-cover mb-4 ring-4 ring-indigo-500/30"
                />

                <h4
                  className={`font-semibold ${
                    dark ? "text-white" : "text-gray-800"
                  }`}
                >
                  {winner.name}
                </h4>

                <p
                  className={`text-sm ${
                    dark ? "text-gray-300" : "text-gray-500"
                  }`}
                >
                  Won ${winner.prize}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Winner;
