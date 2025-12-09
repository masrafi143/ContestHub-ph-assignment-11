// src/pages/admin/AdminManageUsers.jsx
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth"; // adjust path if needed

export default function AdminManageUsers() {
  const { dbUser } = useAuth(); // optional role check
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState(null);

  // toast (top-end)
  const fireToast = (title, icon = "success") => {
    Swal.fire({
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:3000/users");
      if (!res.ok) throw new Error("Failed to load users");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error(err);
      setError(err.message || "Error loading users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // optionally guard by role:
    // if (dbUser?.role !== 'admin') return;
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // change role handler
  const changeRole = async (userId, currentRole, newRole) => {
    if (currentRole === newRole) {
      fireToast("User already has this role", "info");
      return;
    }

    const { isConfirmed } = await Swal.fire({
      title: "Change role?",
      text: `Change role from "${currentRole}" to "${newRole}" for this user?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `Yes, change to ${newRole}`,
    });

    if (!isConfirmed) return;

    try {
      setActionLoadingId(userId);

      // NOTE: change endpoint if your server expects /users/:id (original)
      const res = await fetch(`http://localhost:3000/users-role/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      const result = await res.json();

      // Accept backends that return { success: true } or modifiedCount
      if (result.success || result.modifiedCount) {
        fireToast(`Role updated to ${newRole}`, "success");
        // optimistic update: update local users array
        setUsers((prev) => prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u)));
      } else {
        fireToast(result.message || "Failed to update role", "error");
      }
    } catch (err) {
      console.error(err);
      fireToast("Server error", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  // delete user
  const handleDeleteUser = async (userId) => {
    const { isConfirmed } = await Swal.fire({
      title: "Delete user?",
      text: "This will remove the user. This cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete",
    });

    if (!isConfirmed) return;

    try {
      setActionLoadingId(userId);
      const res = await fetch(`http://localhost:3000/users/${userId}`, { method: "DELETE" });
      const result = await res.json();
      if (result.deletedCount || result.success) {
        Swal.fire({ title: "Deleted!", text: "User deleted.", icon: "success" });
        setUsers((prev) => prev.filter((u) => u._id !== userId));
      } else {
        fireToast("Delete failed", "error");
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
      <h2 className="text-2xl font-bold mb-4">Manage Users</h2>

      {dbUser?.role !== "admin" && (
        <div className="mb-4 p-3 rounded bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800">
          You are not an admin. Only admins should manage users.
        </div>
      )}

      {loading ? (
        <div className="p-6 text-center">Loading users...</div>
      ) : error ? (
        <div className="p-6 text-center text-red-600">Error: {error}</div>
      ) : users.length === 0 ? (
        <div className="p-6 text-center text-gray-600">No users found.</div>
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-x-auto bg-white dark:bg-gray-800 rounded-md shadow-sm">
            <table className="min-w-full divide-y">
              <thead className="bg-gray-100 dark:bg-gray-700">
                <tr>
                  <th className="px-4 py-3 text-left">#</th>
                  <th className="px-4 py-3 text-left">User</th>
                  <th className="px-4 py-3 text-left">Email</th>
                  <th className="px-4 py-3 text-left">Role</th>
                  <th className="px-4 py-3 text-left">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-white divide-y">
                {users.map((u, idx) => (
                  <tr key={u._id} className="hover:bg-gray-50 dark:hover:bg-gray-900">
                    <td className="px-4 py-3 whitespace-nowrap">{idx + 1}</td>

                    <td className="px-4 py-3 whitespace-nowrap flex items-center gap-3">
                      <img
                        src={u.image || "/placeholder.png"}
                        alt={u.name || u.email}
                        className="w-10 h-10 rounded-full object-cover"
                        onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                      />
                      <div>
                        <div className="font-medium">{u.name || "—"}</div>
                        <div className="text-xs text-gray-500">{u.address || ""}</div>
                      </div>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">{u.email}</td>

                    <td className="px-4 py-3 whitespace-nowrap capitalize">
                      <span
                        className={`px-2 py-1 rounded-full text-sm ${
                          u.role === "admin"
                            ? "bg-green-100 text-green-800"
                            : u.role === "creator"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-800"
                        }`}
                      >
                        {u.role || "user"}
                      </span>
                    </td>

                    <td className="px-4 py-3 whitespace-nowrap">
                      <div className="flex gap-2 items-center">
                        <select
                          value={u.role || "user"}
                          onChange={(e) => changeRole(u._id, u.role || "user", e.target.value)}
                          disabled={actionLoadingId === u._id}
                          className="select select-sm select-bordered w-fit"
                        >
                          <option value="user">User</option>
                          <option value="creator">Creator</option>
                          <option value="admin">Admin</option>
                        </select>

                        <button
                          onClick={() => handleDeleteUser(u._id)}
                          disabled={actionLoadingId === u._id}
                          className="btn btn-sm btn-error"
                        >
                          {actionLoadingId === u._id ? "..." : "Delete"}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* MOBILE CARDS */}
          <div className="md:hidden space-y-4">
            {users.map((u, idx) => (
              <div key={u._id} className="p-4 bg-white dark:bg-gray-800 rounded shadow-sm border">
                <div className="flex items-center gap-3">
                  <img
                    src={u.image || "/placeholder.png"}
                    alt={u.name || u.email}
                    className="w-12 h-12 rounded-full object-cover"
                    onError={(e) => (e.currentTarget.src = "/placeholder.png")}
                  />
                  <div className="flex-1">
                    <div className="font-medium">{u.name || "—"}</div>
                    <div className="text-xs text-gray-500">{u.email}</div>
                    <div className="text-xs text-gray-500">{u.address || ""}</div>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="text-sm">Role:</span>
                  <select
                    value={u.role || "user"}
                    onChange={(e) => changeRole(u._id, u.role || "user", e.target.value)}
                    disabled={actionLoadingId === u._id}
                    className="select select-sm select-bordered"
                  >
                    <option value="user">User</option>
                    <option value="creator">Creator</option>
                    <option value="admin">Admin</option>
                  </select>

                  <button
                    onClick={() => handleDeleteUser(u._id)}
                    disabled={actionLoadingId === u._id}
                    className="btn btn-xs btn-error"
                  >
                    {actionLoadingId === u._id ? "..." : "Delete"}
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
