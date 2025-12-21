import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";

export default function AdminManageUsers() {
  const { dbUser, dark } = useAuth();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState(null);

  /* ================== UI HELPERS ================== */
  const pageBg = dark
    ? "bg-[#0b132b] text-gray-100"
    : "bg-base-100 text-gray-900";
  const cardBg = dark
    ? " border-gray-700"
    : "bg-white border-base-300";
  const headerBg = dark ? "bg-[#111c44]" : "bg-base-200";
  const mutedText = dark ? "text-gray-300" : "text-gray-600";

  const roleBadge = (role) => {
    if (role === "admin") return "bg-green-500/20 text-green-600";
    if (role === "creator") return "bg-blue-500/20 text-blue-600";
    return "bg-gray-500/20 text-gray-600";
  };

  /* ================== TOAST ================== */
  const fireToast = (title, icon = "success") => {
    Swal.fire({
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  /* ================== LOAD USERS ================== */
  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://contest-hub-server-gold.vercel.app/users");
      if (!res.ok) throw new Error("Failed to load users");
      const data = await res.json();
      setUsers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError(err.message || "Error loading users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
  }, []);

  /* ================== CHANGE ROLE ================== */
  const changeRole = async (userId, currentRole, newRole) => {
    if (currentRole === newRole) {
      fireToast("User already has this role", "info");
      return;
    }

    const { isConfirmed } = await Swal.fire({
      title: "Change role?",
      text: `Change role from "${currentRole}" to "${newRole}"?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, change",
    });

    if (!isConfirmed) return;

    try {
      setActionLoadingId(userId);
      const res = await fetch(`https://contest-hub-server-gold.vercel.app/users-role/${userId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });
      const result = await res.json();

      if (result.success || result.modifiedCount) {
        fireToast(`Role updated to ${newRole}`);
        setUsers((prev) =>
          prev.map((u) => (u._id === userId ? { ...u, role: newRole } : u))
        );
      } else {
        fireToast("Failed to update role", "error");
      }
    } catch {
      fireToast("Server error", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  /* ================== DELETE USER ================== */
  const handleDeleteUser = async (userId) => {
    const { isConfirmed } = await Swal.fire({
      title: "Delete user?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Delete",
    });

    if (!isConfirmed) return;

    try {
      setActionLoadingId(userId);
      const res = await fetch(`https://contest-hub-server-gold.vercel.app/users/${userId}`, {
        method: "DELETE",
      });
      const result = await res.json();

      if (result.deletedCount || result.success) {
        fireToast("User deleted");
        setUsers((prev) => prev.filter((u) => u._id !== userId));
      } else {
        fireToast("Delete failed", "error");
      }
    } catch {
      fireToast("Server error", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  /* ================== RENDER ================== */
  return (
    <div className={`w-full p-6 rounded-xl ${pageBg}`}>
      <h2 className="text-2xl font-bold mb-6">Manage Users</h2>

      {dbUser?.role !== "admin" && (
        <div className="mb-6 p-4 rounded-lg bg-yellow-500/10 text-yellow-300">
          Only admins can manage users.
        </div>
      )}

      {loading && <p className="text-center py-10">Loading users...</p>}
      {error && <p className="text-center text-red-400">{error}</p>}

      {!loading && users.length === 0 && (
        <p className={`text-center py-10 ${mutedText}`}>No users found.</p>
      )}

      {/* ================== DESKTOP TABLE ================== */}
      {!loading && users.length > 0 && (
        <div
          className={`hidden md:block overflow-x-auto rounded-xl border ${cardBg}`}
        >
          <table className="min-w-full text-sm">
            <thead className={headerBg}>
              <tr>
                <th className="px-4 py-3 text-left">#</th>
                <th className="px-4 py-3 text-left">User</th>
                <th className="px-4 py-3 text-left">Email</th>
                <th className="px-4 py-3 text-left">Role</th>
                <th className="px-4 py-3 text-left">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.map((u, i) => (
                <tr
                  key={u._id}
                  className={`border-t ${
                    dark
                      ? "border-gray-700 hover:bg-[#111c44]"
                      : "hover:bg-base-200"
                  }`}
                >
                  <td className="px-4 py-3">{i + 1}</td>

                  <td className="px-4 py-3 flex items-center gap-3">
                    <img
                      src={u.image || "/placeholder.png"}
                      alt=""
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <div className="font-semibold">{u.name || "—"}</div>
                      <div className="text-xs opacity-60">
                        {u.address || ""}
                      </div>
                    </div>
                  </td>

                  <td className="px-4 py-3">{u.email}</td>

                  <td className="px-4 py-3">
                    <span
                      className={`px-3 py-1 rounded-full capitalize ${roleBadge(
                        u.role
                      )}`}
                    >
                      {u.role || "user"}
                    </span>
                  </td>

                  <td className="px-4 py-3 flex gap-2">
                    <select
                      value={u.role || "user"}
                      onChange={(e) =>
                        changeRole(u._id, u.role || "user", e.target.value)
                      }
                      disabled={actionLoadingId === u._id}
                      className={`select select-sm border ${
                        dark
                          ? "bg-[#0b132b] text-gray-100 border-gray-700"
                          : "bg-white text-gray-900 border-base-300"
                      }`}
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
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ================== MOBILE CARDS ================== */}
      <div className="md:hidden space-y-4">
        {users.map((u) => (
          <div key={u._id} className={`p-4 rounded-xl border ${cardBg}`}>
            <div className="flex items-center gap-3">
              <img
                src={u.image || "/placeholder.png"}
                className="w-12 h-12 rounded-full"
              />
              <div>
                <div className="font-semibold">{u.name || "—"}</div>
                <div className="text-xs opacity-60">{u.email}</div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <span
                className={`px-2 py-1 rounded-full text-xs ${roleBadge(
                  u.role
                )}`}
              >
                {u.role || "user"}
              </span>

              <select
                value={u.role || "user"}
                onChange={(e) =>
                  changeRole(u._id, u.role || "user", e.target.value)
                }
                className="select select-xs"
              >
                <option value="user">User</option>
                <option value="creator">Creator</option>
                <option value="admin">Admin</option>
              </select>

              <button
                onClick={() => handleDeleteUser(u._id)}
                className="btn btn-xs btn-error ml-auto"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
