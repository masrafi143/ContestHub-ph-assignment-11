import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

const MyProfile = () => {
  const { user, dbUser, updateUserProfile, fetchDbUser, loading } = useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(dbUser?.name || user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(dbUser?.image || user?.photoURL || "");
  const [updating, setUpdating] = useState(false);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!name.trim()) return Swal.fire("Error", "Name cannot be empty", "error");

    setUpdating(true);
    try {
      await updateUserProfile({ displayName: name, photoURL });
      const res = await fetch(`http://localhost:3000/users/${dbUser?._id || user?.email}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, image: photoURL }),
      });
      if (!res.ok) throw new Error("DB update failed");
      await fetchDbUser(user?.email);
      setIsEditing(false);
      Swal.fire("Success!", "Profile updated!", "success");
    } catch (err) {
      Swal.fire("Error", "Update failed", "error");
    } finally {
      setUpdating(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-tr from-pink-500/20 via-purple-500/20 to-cyan-500/20 animate-pulse"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-2xl">
          {/* Main Glass Card */}
          <div className="backdrop-blur-xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 md:p-12">
            {/* Avatar with Neon Glow */}
            <div className="flex flex-col items-center -mt-20 md:-mt-24">
              <div className="relative">
                <div className="avatar">
                  <div className="w-32 md:w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-8 ring-offset-transparent shadow-2xl">
                    <img
                      src={dbUser?.image || user?.photoURL || "https://i.ibb.co.com/5Yc6f8d/avatar-placeholder.png"}
                      alt="Profile"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div className="absolute inset-0 rounded-full bg-primary/30 blur-xl animate-pulse"></div>
              </div>

              <h1 className="mt-6 text-3xl md:text-4xl font-bold text-white">
                {dbUser?.name || user?.displayName}
              </h1>

              <p className="text-white/70 text-lg mt-2">{user?.email}</p>

              {/* Role Badge with Glow */}
              <div className="mt-4">
                <span className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-violet-500 text-white font-semibold shadow-lg shadow-purple-500/50 capitalize">
                  {dbUser?.role || "user"}
                </span>
              </div>

              {/* Edit Button with Neon Effect */}
              <button
                onClick={() => setIsEditing(true)}
                className="mt-8 px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold rounded-full shadow-lg hover:shadow-cyan-500/50 transition duration-300 hover:scale-105"
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Edit Form (Floating Glass Panel) */}
          {isEditing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div className="w-full max-w-lg backdrop-blur-2xl bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8 animate-in fade-in zoom-in duration-300">
                <h2 className="text-2xl font-bold text-white mb-6 text-center">Update Profile</h2>

                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div>
                    <label className="block text-white/80 mb-2">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-white/80 mb-2">Photo URL</label>
                    <input
                      type="url"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-cyan-500"
                      placeholder="https://..."
                    />
                  </div>

                  {photoURL && (
                    <div className="flex justify-center">
                      <img src={photoURL} alt="Preview" className="w-24 h-24 rounded-full ring-4 ring-cyan-500/50" />
                    </div>
                  )}

                  <div className="flex gap-4 justify-end mt-8">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="px-6 py-3 rounded-xl bg-white/10 text-white hover:bg-white/20 transition"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={updating}
                      className="px-8 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold shadow-lg hover:shadow-cyan-500/50 transition hover:scale-105"
                    >
                      {updating ? "Saving..." : "Save Changes"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;