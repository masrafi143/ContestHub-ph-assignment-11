// src/components/home/Winner.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const API_BASE = "http://localhost:3000";

const Winner = () => {
  const { dark } = useAuth();
  const [stats, setStats] = useState({ totalWinners: 0, totalPrize: 0 });
  const [winners, setWinners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, winnersRes] = await Promise.all([
          axios.get(`${API_BASE}/stats`),
          axios.get(`${API_BASE}/winners/recent`)
        ]);

        setStats(statsRes.data || { totalWinners: 0, totalPrize: 0 });
        setWinners(Array.isArray(winnersRes.data) ? winnersRes.data : []);
      } catch (err) {
        console.error("Winner section error:", err);
        setError("Failed to load winners.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <section className="py-24 text-center text-gray-500">
        Loading winners...
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-24 text-center text-red-500">
        {error}
      </section>
    );
  }

  return (
    <section
      className={`relative py-24 transition-colors duration-300 ${
        dark
          ? "bg-gradient-to-br from-[#0f1225] via-[#13173a] to-[#0f1225]"
          : "bg-gradient-to-br from-indigo-50 via-white to-indigo-50"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Text */}
          <div>
            <span className="inline-block mb-4 px-4 py-1 rounded-full text-sm font-semibold bg-indigo-600 text-white">
              Community Success
            </span>

            <h2
              className={`text-4xl lg:text-5xl font-extrabold leading-tight mb-6 ${
                dark ? "text-white" : "text-gray-900"
              }`}
            >
              Real People. Real Wins. Real Rewards.
            </h2>

            <p
              className={`mb-10 text-lg max-w-xl ${
                dark ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Thousands of creators are transforming their passion into rewards.
              Compete, create, and become our next success story.
            </p>

            <div className="grid grid-cols-2 gap-8">
              <StatCard
                title="Total Winners"
                value={`${stats.totalWinners}+`}
                dark={dark}
              />
              <StatCard
                title="Prize Money Awarded"
                value={`$${stats.totalPrize}+`}
                dark={dark}
              />
            </div>
          </div>

          {/* Winners */}
          <div className="grid grid-cols-2 gap-6">
            {winners.slice(0, 4).map((winner) => (
              <div
                key={winner._id}
                className={`group p-6 rounded-2xl shadow-lg text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl ${
                  dark ? "bg-[#1a1f3d]" : "bg-white"
                }`}
              >
                <img
                  src={winner.image}
                  alt={`${winner.name} profile`}
                  className="w-24 h-24 mx-auto rounded-full object-cover mb-4 ring-4 ring-indigo-500/40 group-hover:ring-indigo-500"
                />

                <h4
                  className={`font-semibold text-lg ${
                    dark ? "text-white" : "text-gray-800"
                  }`}
                >
                  {winner.name}
                </h4>

                <p
                  className={`text-sm mt-1 ${
                    dark ? "text-indigo-300" : "text-indigo-600"
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

const StatCard = ({ title, value, dark }) => (
  <div
    className={`p-8 rounded-2xl shadow-md transition-transform hover:scale-[1.02] ${
      dark ? "bg-[#1a1f3d]" : "bg-white"
    }`}
  >
    <h3
      className={`text-4xl font-bold mb-2 ${
        dark ? "text-indigo-400" : "text-indigo-600"
      }`}
    >
      {value}
    </h3>
    <p className={`${dark ? "text-gray-300" : "text-gray-600"}`}>{title}</p>
  </div>
);

export default Winner;
