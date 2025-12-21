// src/components/home/Winner.jsx
import { useEffect, useState } from "react";
import axios from "axios";

const Winner = () => {
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
    <section className="py-20 bg-gradient-to-r from-indigo-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <div>
            <h2 className="text-4xl font-extrabold mb-6">
              Our Winners Speak for Us
            </h2>

            <p className="text-gray-700 mb-8 text-lg">
              Thousands of creators have already turned their skills into
              rewards. You could be the next success story.
            </p>

            <div className="grid grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-3xl font-bold text-indigo-600">
                  {stats.totalWinners || 0}+
                </h3>
                <p className="text-gray-600">Total Winners</p>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <h3 className="text-3xl font-bold text-indigo-600">
                  ${stats.totalPrize || 0}+
                </h3>
                <p className="text-gray-600">Prize Money Awarded</p>
              </div>
            </div>
          </div>

          {/* Winner Cards */}
          <div className="grid grid-cols-2 gap-6">
            {winners.slice(0, 4).map((winner) => (
              <div
                key={winner._id}
                className="bg-white p-5 rounded-xl shadow text-center"
              >
                <img
                  src={winner.image}
                  alt={winner.name}
                  className="w-20 h-20 mx-auto rounded-full object-cover mb-4"
                />
                <h4 className="font-semibold">{winner.name}</h4>
                <p className="text-sm text-gray-500">
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
