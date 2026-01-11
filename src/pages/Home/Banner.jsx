// src/components/home/Banner.jsx
import { useState } from "react";
import { useNavigate } from "react-router";
import useAuth from "../../hooks/useAuth";

const Banner = () => {
  const { dark } = useAuth();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/all-contests?search=${search}`);
  };

  return (
    <section
      className={`min-h-[80vh] flex items-center justify-center px-4 transition-colors duration-300
        `}
    >
      <div className="max-w-4xl text-center">
        <h1
          className={`text-4xl md:text-6xl font-extrabold mb-6 transition-colors
            ${dark ? "text-gray-100" : "text-gray-900"}`}
        >
          Discover Creative Contests & Win Big
        </h1>

        <p
          className={`text-lg md:text-xl mb-10 transition-colors
            ${dark ? "text-gray-300" : "text-gray-700"}`}
        >
          Participate, showcase your talent, and earn exciting rewards
        </p>

        <form
          onSubmit={handleSearch}
          className={`flex flex-col md:flex-row gap-4 p-4 rounded-xl shadow-xl transition-colors
            ${
              dark
                ? "bg-[#1a1f3d] border border-gray-700"
                : "bg-white border border-gray-200"
            }`}
        >
          <input
            type="text"
            placeholder="Search by contest type (Design, Coding...)"
            className={`flex-1 px-4 py-3 rounded-lg focus:outline-none transition-colors
              ${
                dark
                  ? "bg-[#0b132b] text-gray-200 placeholder-gray-400 border border-gray-600"
                  : "bg-gray-50 text-gray-800 placeholder-gray-500 border border-gray-300"
              }`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            type="submit"
            className={`px-8 py-3 rounded-lg font-semibold transition-colors
              ${
                dark
                  ? "bg-indigo-500 hover:bg-indigo-600 text-white"
                  : "bg-indigo-600 hover:bg-indigo-700 text-white"
              }`}
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default Banner;
