import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../provider/AuthProvider";
import { useNavigate } from "react-router";

const MyCreatedContests = () => {
  const { user } = useContext(AuthContext);
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
          `http://localhost:3000/contests?email=${userEmail}`
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
    const confirm = window.confirm(
      "Are you sure you want to delete this contest?"
    );
    if (!confirm) return;

    try {
      const res = await fetch(`http://localhost:3000/contests/${id}`, {
        method: "DELETE",
      });
      const result = await res.json();
      if (result.deletedCount) {
        setContests(contests.filter((c) => c._id !== id));
        alert("Contest deleted successfully!");
      } else {
        alert("Failed to delete contest.");
      }
    } catch (err) {
      console.error(err);
      alert("Something went wrong while deleting.");
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
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
    <div className="w-11/12 mx-auto py-10 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">My Contests</h1>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead className="bg-gray-100 dark:bg-gray-700">
            <tr>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                #
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Name
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Type
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Prize
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Deadline
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Status
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contests.map((item, index) => (
              <tr
                key={item._id}
                className="hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center">
                  {index + 1}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  {item.name || "—"}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  {item.type || "—"}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  {item.prize ? `${item.prize} Tk` : "—"}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  {item.deadline
                    ? new Date(item.deadline).toLocaleString()
                    : "—"}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2">
                  {item.status || "Pending"}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 flex gap-2">
                  {/* Edit button */}
                  <button
                    onClick={() => navigate(`/edit-contest/${item._id}`)} // navigate to edit page with ID
                    className={`btn btn-sm btn-warning `}
                  >
                    Edit
                  </button>

                  {/* Delete button (only if Pending) */}
                  <button
                    onClick={() => handleDelete(item._id)}
                    className={`btn btn-sm btn-error `}
                  >
                    Delete
                  </button>

                  {/* See Submissions button */}
                  <button
                    className="btn btn-sm btn-info"
                    onClick={() => alert("Navigate to submissions page")}
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