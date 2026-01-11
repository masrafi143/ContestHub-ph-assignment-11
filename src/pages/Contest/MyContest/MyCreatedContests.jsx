import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { useNavigate } from "react-router";
import useAuth from "../../../hooks/useAuth";

const MyCreatedContests = () => {
  const { user } = useContext(AuthContext);
  const { dark } = useAuth();

  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);

  const userEmail = user?.email;
  const navigate = useNavigate();

  useEffect(() => {
    if (!userEmail) {
      setContests([]);
      setLoading(false);
      return;
    }

    const fetchContests = async () => {
      setLoading(true);
      try {
        const res = await fetch(
          `https://contest-hub-server-gold.vercel.app/contests?email=${userEmail}`
        );
        if (!res.ok) throw new Error("Failed to fetch contests");
        const data = await res.json();
        setContests(data || []);
      } catch (err) {
        console.error(err);
        setContests([]);
      } finally {
        setLoading(false);
      }
    };

    fetchContests();
  }, [userEmail]);

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this contest?")) return;

    try {
      const res = await fetch(`https://contest-hub-server-gold.vercel.app/contests/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.deletedCount) {
        setContests((prev) => prev.filter((c) => c._id !== id));
        alert("Contest deleted successfully!");
      } else {
        alert("Failed to delete contest.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while deleting.");
    }
  };

  if (loading)
    return (
      <p className={`text-center mt-10 ${dark ? "text-gray-300" : "text-gray-700"}`}>
        Loading...
      </p>
    );

  if (!userEmail)
    return (
      <p className="text-center mt-10 text-gray-500">
        Please log in to see your created contests.
      </p>
    );

  if (contests.length === 0)
    return (
      <p className="text-center mt-10 text-gray-500">
        You have not created any contests yet.
      </p>
    );

  return (
    <div
      className={`w-11/12 mx-auto py-10 min-h-screen transition-colors ${
        dark ? "bg-[#0f172a] text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      <h1 className="text-3xl font-bold mb-6 text-center">My Contests</h1>

      <div className="overflow-x-auto">
        <table
          className={`table-auto w-full border-collapse border ${
            dark ? "border-gray-600" : "border-gray-300"
          }`}
        >
          <thead className={dark ? "bg-gray-800" : "bg-gray-100"}>
            <tr>
              {["#", "Name", "Type", "Prize", "Deadline", "Status", "Actions"].map(
                (h) => (
                  <th
                    key={h}
                    className={`border px-4 py-2 ${
                      dark ? "border-gray-600" : "border-gray-300"
                    }`}
                  >
                    {h}
                  </th>
                )
              )}
            </tr>
          </thead>
          <tbody>
            {contests.map((item, index) => (
              <tr
                key={item._id}
                className={`hover:${dark ? "bg-gray-800" : "bg-gray-50"}`}
              >
                <td className="border px-4 py-2 text-center">{index + 1}</td>
                <td className="border px-4 py-2">{item.name || "—"}</td>
                <td className="border px-4 py-2">{item.type || "—"}</td>
                <td className="border px-4 py-2">
                  {item.prize ? `${item.prize} Tk` : "—"}
                </td>
                <td className="border px-4 py-2">
                  {item.deadline
                    ? new Date(item.deadline).toLocaleString()
                    : "—"}
                </td>
                <td className="border px-4 py-2">{item.status || "Pending"}</td>
                <td className="border px-4 py-2 flex gap-2">
                  <button
                    onClick={() => navigate(`/edit-contest/${item._id}`)}
                    className="btn btn-sm btn-warning"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => handleDelete(item._id)}
                    className="btn btn-sm btn-error"
                  >
                    Delete
                  </button>

                  <button
                    className="btn btn-sm btn-info"
                    onClick={() =>
                      navigate(`/dashboard/${item._id}/submitted-tasks`)
                    }
                  >
                    See Submissions
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCreatedContests;
