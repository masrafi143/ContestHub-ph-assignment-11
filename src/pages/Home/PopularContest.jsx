import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";
import axios from "axios";

const PopularContest = () => {
  const [contests, setContests] = useState([]);
  const { user, dark } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPopular = async () => {
      try {
        const res = await axios.get("http://localhost:3000/contests");
        if (!Array.isArray(res.data)) return;

        // Ensure popular === "yes" (case-insensitive)
        const popular = res.data
          .filter((c) => String(c.popular).toLowerCase() === "yes")
          .slice(0, 6); // limit to 6
        setContests(popular);
      } catch (err) {
        console.error("Error fetching contests:", err);
      }
    };

    fetchPopular();
  }, []);

  const handleDetails = (id) => {
    if (!user?.email) return navigate("/login");
    navigate(`/contests/${id}`);
  };

  if (contests.length === 0) {
    return (
      <section className="py-16 text-center">
        <h2
          className={
            dark
              ? "text-gray-100 text-3xl font-bold"
              : "text-gray-900 text-3xl font-bold"
          }
        >
          Popular Contests
        </h2>
        <p className={dark ? "text-gray-300 mt-4" : "text-gray-600 mt-4"}>
          No popular contests available at the moment.
        </p>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center mb-10">
          <h2
            className={
              dark
                ? "text-gray-100 text-3xl font-bold"
                : "text-gray-900 text-3xl font-bold"
            }
          >
            Popular Contests
          </h2>
          <button
            onClick={() => navigate("/all-contests")}
            className={
              dark
                ? "text-indigo-400 hover:text-indigo-300"
                : "text-indigo-600 hover:underline"
            }
          >
            Show All
          </button>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {contests.map((c) => (
            <div
              key={c._id}
              className={
                dark
                  ? "bg-[#1a1f3d] text-gray-100 p-4 rounded-lg shadow-md"
                  : "bg-white text-gray-900 p-4 rounded-lg shadow-md"
              }
            >
              <img
                src={c.image || "https://i.ibb.co/2kR5zq0/avatar.png"}
                alt={c.name}
                className="h-48 w-full object-cover rounded-lg mb-3"
              />
              <h3 className="font-semibold text-lg">
                {c.name || "Unnamed Contest"}
              </h3>
              <p className="text-sm mb-2">
                {c.description
                  ? c.description.slice(0, 80) + "..."
                  : "No description"}
              </p>
              <span className="text-indigo-600 font-medium mb-2 block">
                👥 {c.participantsCount ?? 0} Participants
              </span>
              <button
                onClick={() => handleDetails(c._id)}
                className="bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded-lg"
              >
                Details
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularContest;
