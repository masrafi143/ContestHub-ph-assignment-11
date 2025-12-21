// src/pages/admin/AdminManageContests.jsx
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../../hooks/useAuth";

export default function ManageContests() {
  const { dbUser, dark } = useAuth();

  const [contests, setContests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState(null);

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
      const res = await fetch("https://contest-hub-server-gold.vercel.app/contests");
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
    loadContests();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      const res = await fetch(`https://contest-hub-server-gold.vercel.app/contest-status/${id}`, {
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
      const res = await fetch(`https://contest-hub-server-gold.vercel.app/contests/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();

      if (data.deletedCount || data.success) {
        Swal.fire({
          title: "Deleted!",
          text: "Contest has been deleted.",
          icon: "success",
        });
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

  const tableHeaderBg = dark ? "bg-[#111c44] text-gray-200" : "bg-base-200 text-gray-900";
  const rowBg = dark ? "bg-[#0b132b] text-gray-100" : "bg-white text-gray-900";
  const rowHoverBg = dark ? "hover:bg-[#1e2a5a]" : "hover:bg-base-300";

  return (
    <div className="w-11/12 mx-auto py-8">
      <h2 className={`text-2xl font-bold mb-4 ${dark ? "text-gray-100" : "text-gray-900"}`}>
        Manage Contests
      </h2>

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
          {/* Desktop Table */}
          <div className={`hidden md:block overflow-x-auto rounded-md shadow-sm border ${dark ? "border-gray-700" : "border-base-300"}`}>
            <table className="min-w-full text-sm">
              <thead className={tableHeaderBg}>
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
              <tbody>
                {contests.map((c, idx) => (
                  <tr key={c._id} className={`${rowBg} ${rowHoverBg} border-t ${dark ? "border-gray-700" : "border-base-300"} transition-colors`}>
                    <td className="px-4 py-3">{idx + 1}</td>
                    <td className="px-4 py-3 max-w-xs">{c.name}</td>
                    <td className="px-4 py-3">{c.type}</td>
                    <td className="px-4 py-3">{c.email || c.senderEmail || "—"}</td>
                    <td className="px-4 py-3 text-center">{c.participantsCount || 0}</td>
                    <td className="px-4 py-3">{c.prize || "—"}</td>
                    <td className="px-4 py-3">{c.deadline ? new Date(c.deadline).toLocaleString() : "—"}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          c.status === "pending"
                            ? dark
                              ? "bg-yellow-900 text-yellow-200"
                              : "bg-yellow-100 text-yellow-800"
                            : c.status === "confirmed"
                            ? dark
                              ? "bg-green-900 text-green-200"
                              : "bg-green-100 text-green-800"
                            : dark
                            ? "bg-red-900 text-red-200"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {c.status || "pending"}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2 justify-center flex-wrap">
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

          {/* Mobile Cards */}
          <div className="md:hidden space-y-4">
            {contests.map((c, idx) => (
              <div key={c._id} className={`p-4 rounded shadow-sm border ${dark ? "bg-[#0b132b] border-gray-700 text-gray-100" : "bg-white border-base-300 text-gray-900"}`}>
                <div className="flex justify-between items-start">
                  <div>
                    <div className="text-lg font-semibold">{c.name}</div>
                    <div className="text-sm opacity-70">
                      {c.type} • {c.email || c.senderEmail || "—"}
                    </div>
                    <div className="text-sm mt-2">{c.description ? c.description.slice(0, 120) : "No description"}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-sm">{c.prize || "—"}</div>
                    <div className="text-xs opacity-60">{c.deadline ? new Date(c.deadline).toLocaleString() : "—"}</div>
                  </div>
                </div>

                <div className="mt-3 flex flex-wrap gap-2 items-center">
                  <span
                    className={`px-2 py-1 rounded-full text-sm ${
                      c.status === "pending"
                        ? dark
                          ? "bg-yellow-900 text-yellow-200"
                          : "bg-yellow-100 text-yellow-800"
                        : c.status === "confirmed"
                        ? dark
                          ? "bg-green-900 text-green-200"
                          : "bg-green-100 text-green-800"
                        : dark
                        ? "bg-red-900 text-red-200"
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
