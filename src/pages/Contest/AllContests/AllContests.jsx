// src/pages/AllContests.jsx
import React, { useContext, useEffect, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router";
import { AuthContext } from "../../../provider/AuthProvider";
// adjust path if your provider lives elsewhere

const AllContests = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeType, setActiveType] = useState("All");
  const [search, setSearch] = useState("");
  const [error, setError] = useState(null);

  // load only admin-approved contests
  useEffect(() => {
    let mounted = true;
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch("http://localhost:3000/approved-contests");
        if (!res.ok) throw new Error("Failed to load contests");
        const data = await res.json();
        if (mounted) setContests(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error(err);
        if (mounted) setError(err.message || "Error loading contests");
      } finally {
        if (mounted) setLoading(false);
      }
    };

    load();
    return () => {
      mounted = false;
    };
  }, []);

  // compute distinct contest types (for tabs)
  const types = useMemo(() => {
    const set = new Set();
    contests.forEach((c) => {
      if (c.type) set.add(c.type);
    });
    return ["All", ...Array.from(set)];
  }, [contests]);

  // filter list by type + search
  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return contests.filter((c) => {
      const matchType = activeType === "All" ? true : c.type === activeType;
      const matchSearch = !q
        ? true
        : (c.name || "").toLowerCase().includes(q) ||
          (c.description || "").toLowerCase().includes(q) ||
          (c.type || "").toLowerCase().includes(q);
      return matchType && matchSearch;
    });
  }, [contests, activeType, search]);

  const handleDetails = (contestId) => {
    if (!user?.email) {
      // redirect to login, preserve destination
      navigate("/login", { state: { from: location.pathname } });
      return;
    }
    navigate(`/contests/${contestId}`);
  };
  console.log(contests[0]?.price);

  return (
    <div className="min-h-screen w-11/12 mx-auto py-10">
      {/* Header / Search */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-3">All Contests</h1>
        <p className="text-gray-600 mb-4">
          Explore admin-approved contests and join the creative community.
        </p>

        <div className="max-w-3xl mx-auto flex gap-2">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search contests by name, type, or description..."
            className="input input-bordered flex-1"
          />
        </div>
      </div>

      {/* Tabs */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-2 items-center">
          {types.map((t) => (
            <button
              key={t}
              onClick={() => setActiveType(t)}
              className={`px-4 py-2 rounded-full text-sm whitespace-nowrap ${
                activeType === t
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center py-20">Loading contests...</div>
      ) : error ? (
        <div className="text-center py-20 text-red-600">Error: {error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-20 text-gray-600">
          No contests found for the selected filters.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((c) => (
            <article
              key={c._id}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-hidden flex flex-col"
            >
              {/* image */}
              <div className="h-48 w-full overflow-hidden bg-gray-100">
                <img
                  src={
                    c.image ||
                    "https://imgs.search.brave.com/ETUn1PC-pMpT1fq_3em0f7OzFpBtCoJZAUnuQnsg-Xg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/eHMuY29tL2ltZy9j/b250ZXN0L2RlbW8t/Y29udGVzdC9waGQw/MDAzL2NvbnRlc3Qt/cGhkMDAwMy1ib3g/d2VicA"
                  }
                  alt={c.name}
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.currentTarget.src =
                      "https://imgs.search.brave.com/ETUn1PC-pMpT1fq_3em0f7OzFpBtCoJZAUnuQnsg-Xg/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/eHMuY29tL2ltZy9j/b250ZXN0L2RlbW8t/Y29udGVzdC9waGQw/MDAzL2NvbnRlc3Qt/cGhkMDAwMy1ib3g/d2VicA")
                  }
                />
              </div>

              {/* content */}
              <div className="p-4 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold mb-2">{c.name}</h3>

                <div className="text-xs text-gray-500 mb-2">
                  <span className="mr-3">Type: {c.type || "—"}</span>
                  <span>Participants: {c.participantsCount ?? 0}</span>
                </div>

                <p className="text-sm text-gray-600 flex-1">
                  {c.description
                    ? c.description.length > 120
                      ? c.description.slice(0, 120) + "..."
                      : c.description
                    : "No description."}
                </p>

                    <div className="text-red-500">
                      Price: {c.price ? `${c.price}` : "—"}
                    </div>
                <div className="mt-4 flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Prize: {c.prize ? `${c.prize}` : "—"}
                  </div>

                  <button
                    onClick={() => handleDetails(c._id)}
                    className="btn btn-sm btn-primary"
                  >
                    Details
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllContests;
