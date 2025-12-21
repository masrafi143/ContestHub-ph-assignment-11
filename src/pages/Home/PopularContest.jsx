// src/components/home/PopularContest.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const PopularContest = () => {
  const [contests, setContests] = useState([]);
  const navigate = useNavigate();
  const { user, dark } = useAuth();

  useEffect(() => {
    axios
      .get("http://localhost:5000/contests/popular?limit=5")
      .then((res) => setContests(res.data))
      .catch((err) => console.error(err));
  }, []);

  const handleDetails = (id) => {
    if (!user) {
      navigate("/login");
    } else {
      navigate(`/contest/${id}`);
    }
  };

  return (
    <section
      className={`py-16 transition-colors
        ${dark ? "" : "bg-gray-50"}`}
    >
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2
              className={`text-3xl font-bold transition-colors
                ${dark ? "text-gray-100" : "text-gray-900"}`}
            >
              Popular Contests
            </h2>
            <p
              className={`transition-colors
                ${dark ? "text-gray-300" : "text-gray-600"}`}
            >
              Most participated contests right now
            </p>
          </div>

          <button
            onClick={() => navigate("/contests")}
            className={`font-semibold transition-colors
              ${
                dark
                  ? "text-indigo-400 hover:text-indigo-300"
                  : "text-indigo-600 hover:underline"
              }`}
          >
            Show All
          </button>
        </div>

        {/* Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contests.map((contest) => (
            <div
              key={contest._id}
              className={`rounded-xl shadow-md hover:shadow-xl transition overflow-hidden
                ${
                  dark
                    ? "bg-[#1a1f3d] border border-gray-700"
                    : "bg-white border border-gray-200"
                }`}
            >
              {/* Image */}
              <img
                src={contest.image}
                alt={contest.name}
                className="h-48 w-full object-cover"
              />

              {/* Content */}
              <div className="p-6">
                <h3
                  className={`text-xl font-semibold mb-2 transition-colors
                    ${dark ? "text-gray-100" : "text-gray-900"}`}
                >
                  {contest.name}
                </h3>

                <p
                  className={`text-sm mb-3 transition-colors
                    ${dark ? "text-gray-300" : "text-gray-600"}`}
                >
                  {contest.description?.slice(0, 80)}...
                </p>

                <div className="flex justify-between items-center mb-4">
                  <span
                    className={`text-sm font-medium transition-colors
                      ${
                        dark
                          ? "text-indigo-400"
                          : "text-indigo-600"
                      }`}
                  >
                    👥 {contest.participantsCount} Participants
                  </span>
                </div>

                <button
                  onClick={() => handleDetails(contest._id)}
                  className={`w-full py-2 rounded-lg font-medium transition-colors
                    ${
                      dark
                        ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                        : "bg-indigo-600 hover:bg-indigo-700 text-white"
                    }`}
                >
                  Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularContest;
