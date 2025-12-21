import { useEffect, useState } from "react";
import axios from "axios";
import useAuth from "../../hooks/useAuth";
 // add dark mode context

const ITEMS_PER_PAGE = 10;

const Leaderboard = () => {
  const { dark } = useAuth(); // dark mode flag
  const [leaders, setLeaders] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);

  const fetchLeaderboard = async (page) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `https://contest-hub-server-gold.vercel.app/leaderboard?page=${page}&limit=${ITEMS_PER_PAGE}`
      );
      setLeaders(res.data.data);
      setCurrentPage(res.data.currentPage);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLeaderboard(currentPage);
  }, [currentPage]);

  if (loading) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center ${
          dark ? "bg-[#0b132b] text-gray-100" : "bg-gray-50 text-gray-900"
        }`}
      >
        <span className="text-lg font-medium">Loading leaderboard...</span>
      </div>
    );
  }

  return (
    <section
      className={`min-h-screen py-16 transition-colors ${
        dark ? "bg-[#0b132b] text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-10">
          <h1
            className={`text-4xl font-extrabold mb-2 ${
              dark ? "text-cyan-400" : "text-indigo-600"
            }`}
          >
            🏆 Leaderboard
          </h1>
          <p className={dark ? "text-gray-300" : "text-gray-600"}>
            Ranked by contest wins
          </p>
        </div>

        {/* Table */}
        <div
          className={`rounded-xl overflow-x-auto shadow transition-colors ${
            dark ? "bg-[#111c44]" : "bg-white"
          }`}
        >
          <table className="w-full text-left">
            <thead className={`${dark ? "bg-[#1e2a5a] text-white" : "bg-indigo-600 text-white"}`}>
              <tr>
                <th className="px-6 py-4">Rank</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Total Wins</th>
              </tr>
            </thead>

            <tbody>
              {leaders.map((user, index) => (
                <tr
                  key={user._id}
                  className={`border-b transition-colors ${
                    dark
                      ? "hover:bg-[#0b132b]/50 border-[#1e2a5a]"
                      : "hover:bg-gray-50 border-gray-200"
                  }`}
                >
                  <td className="px-6 py-4 font-bold">
                    {(currentPage - 1) * ITEMS_PER_PAGE + index + 1}
                  </td>

                  <td className="px-6 py-4 flex items-center gap-4">
                    <img
                      src={user.photo || "https://i.ibb.co/2kR5zq0/avatar.png"}
                      alt={user.name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{user.name}</h3>
                      <p className={dark ? "text-gray-300 text-sm" : "text-gray-500 text-sm"}>
                        {user.email}
                      </p>
                    </div>
                  </td>

                  <td
                    className={`px-6 py-4 font-semibold ${
                      dark ? "text-cyan-400" : "text-indigo-600"
                    }`}
                  >
                    {user.totalWins}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center gap-2 mt-8">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((p) => p - 1)}
            className={`px-4 py-2 border rounded-lg disabled:opacity-50 transition-colors ${
              dark ? "border-gray-600 text-gray-100" : "border-gray-300 text-gray-900"
            }`}
          >
            Prev
          </button>

          {[...Array(totalPages).keys()].map((num) => (
            <button
              key={num}
              onClick={() => setCurrentPage(num + 1)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                currentPage === num + 1
                  ? dark
                    ? "bg-cyan-600 text-white"
                    : "bg-indigo-600 text-white"
                  : dark
                  ? "border-gray-600 text-gray-100"
                  : "border-gray-300 text-gray-900"
              }`}
            >
              {num + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((p) => p + 1)}
            className={`px-4 py-2 border rounded-lg disabled:opacity-50 transition-colors ${
              dark ? "border-gray-600 text-gray-100" : "border-gray-300 text-gray-900"
            }`}
          >
            Next
          </button>
        </div>
      </div>
    </section>
  );
};

export default Leaderboard;
