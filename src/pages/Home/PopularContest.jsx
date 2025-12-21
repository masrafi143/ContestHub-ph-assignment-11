// src/components/home/PopularContest.jsx
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";
import useAuth from "../../hooks/useAuth";

const PopularContest = () => {
  const [contests, setContests] = useState([]);
  const navigate = useNavigate();
  const { user } = useAuth();

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
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <div>
            <h2 className="text-3xl font-bold">Popular Contests</h2>
            <p className="text-gray-600">
              Most participated contests right now
            </p>
          </div>

          <button
            onClick={() => navigate("/contests")}
            className="text-indigo-600 font-semibold hover:underline"
          >
            Show All
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contests.map((contest) => (
            <div
              key={contest._id}
              className="bg-white rounded-xl shadow hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={contest.image}
                alt={contest.name}
                className="h-48 w-full object-cover"
              />

              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">
                  {contest.name}
                </h3>

                <p className="text-sm text-gray-600 mb-3">
                  {contest.description.slice(0, 80)}...
                </p>

                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm font-medium text-indigo-600">
                    👥 {contest.participantsCount} Participants
                  </span>
                </div>

                <button
                  onClick={() => handleDetails(contest._id)}
                  className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded-lg font-medium transition"
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
