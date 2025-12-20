import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function AdminManageUsers() {
  const { dbUser } = useAuth();
  const axiosSecure = useAxiosSecure();

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState(null);
  const [error, setError] = useState(null);

  // toast
  const fireToast = (title, icon = "success") => {
    Swal.fire({
      position: "top-end",
      icon,
      title,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  // load users
  const loadUsers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosSecure.get("/users");
      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error(err);
      setError("Failed to load users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // change role (FIXED)
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
      confirmButtonText: "Yes, change role",
    });

    if (!isConfirmed) return;

    try {
      setActionLoadingId(userId);

      const res = await axiosSecure.patch(
        `/users-role/${userId}`,
        { role: newRole }
      );

      if (res.data.modifiedCount) {
        fireToast(`Role updated to ${newRole}`);

        setUsers((prev) =>
          prev.map((u) =>
            u._id === userId ? { ...u, role: newRole } : u
          )
        );
      } else {
        fireToast("Role update failed", "error");
      }
    } catch (err) {
      console.error(err);
      fireToast("Unauthorized or server error", "error");
    } finally {
      setActionLoadingId(null);
    }
  };

  // delete user
  const handleDeleteUser = async (userId) => {
    const { isConfirmed } = await Swal.fire({
      title: "Delete user?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (!isConfirmed) return;

    try {
      setActionLoadingId(userId);

      const res = await axiosSecure.delete(`/users/${userId}`);

      if (res.data.deletedCount) {
        fireToast("User deleted");
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
        <div className="mb-4 p-3 rounded bg-yellow-50 text-yellow-800">
          You are not an admin. Only admins should manage users.
        </div>
      )}

      {loading ? (
        <div className="p-6 text-center">Loading users...</div>
      ) : error ? (
        <div className="p-6 text-center text-red-600">{error}</div>
      ) : users.length === 0 ? (
        <div className="p-6 text-center text-gray-600">No users found.</div>
      ) : (
        <>
          {/* DESKTOP TABLE */}
          <div className="hidden md:block overflow-x-auto bg-white rounded-md shadow-sm">
            <table className="min-w-full divide-y">
              <thead className="bg-gray-100">
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
                  <tr key={u._id} className="hover:bg-gray-50">
                    <td className="px-4 py-3">{idx + 1}</td>

                    <td className="px-4 py-3 flex items-center gap-3">
                      <img
                        src={u.image || "/placeholder.png"}
                        alt={u.name || u.email}
                        className="w-10 h-10 rounded-full"
                        onError={(e) =>
                          (e.currentTarget.src = "/placeholder.png")
                        }
                      />
                      <div>
                        <div className="font-medium">{u.name || "—"}</div>
                        <div className="text-xs text-gray-500">
                          {u.address || ""}
                        </div>
                      </div>
                    </td>

                    <td className="px-4 py-3">{u.email}</td>

                    <td className="px-4 py-3 capitalize">
                      <span className="px-2 py-1 rounded-full text-sm bg-gray-100">
                        {u.role || "user"}
                      </span>
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <select
                          value={u.role || "user"}
                          onChange={(e) =>
                            changeRole(
                              u._id,
                              u.role || "user",
                              e.target.value
                            )
                          }
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

          {/* MOBILE VIEW */}
          <div className="md:hidden space-y-4">
            {users.map((u) => (
              <div key={u._id} className="p-4 bg-white rounded shadow">
                <div className="flex items-center gap-3">
                  <img
                    src={u.image || "/placeholder.png"}
                    alt={u.email}
                    className="w-12 h-12 rounded-full"
                  />
                  <div>
                    <div className="font-medium">{u.name || "—"}</div>
                    <div className="text-xs">{u.email}</div>
                  </div>
                </div>

                <div className="mt-3 flex gap-2">
                  <select
                    value={u.role || "user"}
                    onChange={(e) =>
                      changeRole(u._id, u.role || "user", e.target.value)
                    }
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
