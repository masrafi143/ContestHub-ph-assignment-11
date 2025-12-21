// src/components/home/Banner.jsx
import { useState } from "react";
import { useNavigate } from "react-router";

const Banner = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/contests?search=${search}`);
  };

  return (
    <section className="min-h-[80vh] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 flex items-center justify-center px-4">
      <div className="max-w-4xl text-center text-white">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
          Discover Creative Contests & Win Big
        </h1>

        <p className="text-lg md:text-xl mb-10 opacity-90">
          Participate, showcase your talent, and earn exciting rewards
        </p>

        <form
          onSubmit={handleSearch}
          className="flex flex-col md:flex-row gap-4 bg-white p-4 rounded-xl shadow-lg"
        >
          <input
            type="text"
            placeholder="Search by contest type (Design, Coding...)"
            className="flex-1 px-4 py-3 rounded-lg text-gray-800 focus:outline-none"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            type="submit"
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Search
          </button>
        </form>
      </div>
    </section>
  );
};

export default Banner;
