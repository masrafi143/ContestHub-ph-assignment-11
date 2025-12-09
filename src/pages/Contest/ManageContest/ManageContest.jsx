// src/pages/admin/AdminManageContests.jsx
import React, { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../../provider/AuthProvider"; // adjust path if needed

export default function AdminManageContests() {
  const { dbUser } = useContext(AuthContext); // optional role check
  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState(null);

  // simple toast helper (top-end)
  const fireToast = (title, icon = "success") => {
    Swal.fire({
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const loadContests = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/contests");
      if (!res.ok) throw new Error("Failed to load contests");
      const data = await res.json();
      setContests(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error loading contests");
      setContests([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Optional: guard for admin role:
    // if (dbUser?.role !== "admin") return; // or show message
    loadContests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // update status (confirm / reject)
  const updateStatus = async (id, newStatus) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: `Do you want to mark this contest as ${newStatus}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, ${newStatus}!`,
    });

    if (!result.isConfirmed) return;

    try {
      setActionLoadingId(id);
      const res = await fetch(`http://localhost:3000/contests/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      const data = await res.json();

      if (data.success || data.modifiedCount) {
        fireToast(`Contest ${newStatus}!`, "success");
        await loadContests();
      } else {
        fireToast(data.message || "Update failed", "error");
      }
    } catch (err) {
      console.error(err);
      fireToast("Server error", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  // delete contest
  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (!result.isConfirmed) return;

    try {
      setActionLoadingId(id);
      const res = await fetch(`http://localhost:3000/contests/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.deletedCount || data.success) {
        Swal.fire({
          title: "Deleted!",
          text: "Contest has been deleted.",
          icon: "success",
        });
        // update UI
        setContests((prev) => prev.filter((c) => c._id !== id));
      } else {
        fireToast(data.message || "Delete failed", "error");
      }
    } catch (err) {
      console.error(err);
      fireToast("Server error", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  return (
    <div className="w-11/12 mx-auto py-8">
      <h2 className="text-2xl font-bold mb-4">Manage Contests</h2>

      {dbUser?.role !== "admin" && (
        <div className="mb-4 p-3 rounded bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800">
          You are not an admin. Only admins should manage contests.
        </div>
      )}

      {loading ? (
        <div className="p-6 text-center">Loading contests...</div>
      ) : error ? (
        <div className="p-6 text-center text-red-600">Error: {error}</div>
      ) : contests.length === 0 ? (
        <div className="p-6 text-center text-gray-600">No contests found.</div>
      ) : (
        <>
          {/* TABLE for md and above */}
          <div className="hidden md:block overflow-x-auto bg-white dark:bg-gray-800 rounded-md shadow-sm">
            <table className="min-w-full divide-y">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">Name</th>
                  <th className="px-4 py-3 text-left">Type</th>
                  <th className="px-4 py-3 text-left">Creator</th>
                  <th className="px-4 py-3 text-left text-center">Participants</th>
                  <th className="px-4 py-3 text-left">Prize</th>
                  <th className="px-4 py-3 text-left">Deadline</th>
                  <th className="px-4 py-3 text-left">Status</th>
                  <th className="px-4 py-3 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y">
                {contests.map((c, idx) => (
                  <tr key={c._id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                    <td className="px-4 py-3 whitespace-nowrap">{idx + 1}</td>
                    <td className="px-4 py-3 whitespace-nowrap max-w-xs">{c.name}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{c.type}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{c.email || c.senderEmail || "—"}</td>
                    <td className="px-4 py-3 whitespace-nowrap text-center">{c.participantsCount || 0}</td>
                    <td className="px-4 py-3 whitespace-nowrap">{c.prize ? `${c.prize}` : "—"}</td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      {c.deadline ? new Date(c.deadline).toLocaleString() : "—"}
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          c.status === "pending"
                            ? "bg-yellow-100 text-yellow-800"
                            : c.status === "confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {c.status || "pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex gap-2 justify-center">
                        <button
                          onClick={() => updateStatus(c._id, "confirmed")}
                          disabled={actionLoadingId === c._id || c.status === "confirmed"}
                          className={`btn btn-sm btn-success ${c.status === "confirmed" ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          {actionLoadingId === c._id ? "..." : "Confirm"}
                        </button>

                        <button
                          onClick={() => updateStatus(c._id, "rejected")}
                          disabled={actionLoadingId === c._id || c.status === "rejected"}
                          className={`btn btn-sm btn-warning ${c.status === "rejected" ? "opacity-50 cursor-not-allowed" : ""}`}
                        >
                          {actionLoadingId === c._id ? "..." : "Reject"}
                        </button>

                        <button
                          onClick={() => handleDelete(c._id)}
                          disabled={actionLoadingId === c._id}
                          className="btn btn-sm btn-error"
                        >
                          {actionLoadingId === c._id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* CARD / LIST for small screens */}
          <div className="md:hidden space-y-4">
            {contests.map((c, idx) => (
              <div key={c._id} className="p-4 bg-white dark:bg-gray-800 rounded shadow-sm border">
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-lg font-semibold">{c.name}</div>
                    <div className="text-sm text-gray-500">
                      {c.type} • {c.email || c.senderEmail || "—"}
                    </div>
                    <div className="text-sm mt-2">{c.description ? c.description.slice(0, 120) : "No description"}</div>
                  </div>

                  <div className="text-right">
                    <div className="text-sm">{c.prize ? `${c.prize}` : "—"}</div>
                    <div className="text-xs text-gray-500">{c.deadline ? new Date(c.deadline).toLocaleString() : "—"}</div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      c.status === "pending"
                        ? "bg-yellow-100 text-yellow-800"
                        : c.status === "confirmed"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {c.status || "pending"}
                  </span>

                  <button
                    onClick={() => updateStatus(c._id, "confirmed")}
                    disabled={actionLoadingId === c._id || c.status === "confirmed"}
                    className="btn btn-xs btn-success"
                  >
                    {actionLoadingId === c._id ? "..." : "Confirm"}
                  </button>

                  <button
                    onClick={() => updateStatus(c._id, "rejected")}
                    disabled={actionLoadingId === c._id || c.status === "rejected"}
                    className="btn btn-xs btn-warning"
                  >
                    {actionLoadingId === c._id ? "..." : "Reject"}
                  </button>

                  <button
                    onClick={() => handleDelete(c._id)}
                    disabled={actionLoadingId === c._id}
                    className="btn btn-xs btn-error"
                  >
                    {actionLoadingId === c._id ? "..." : "Delete"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
