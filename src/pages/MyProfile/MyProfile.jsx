import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../../provider/AuthProvider";

const MyProfile = () => {
  const { user, dbUser, updateUserProfile, fetchDbUser, loading, dark } =
    useContext(AuthContext);

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(dbUser?.name || user?.displayName || "");
  const [photoURL, setPhotoURL] = useState(
    dbUser?.image || user?.photoURL || ""
  );
  const [updating, setUpdating] = useState(false);

  if (loading) {
    return (
      <div
        className={`flex justify-center items-center min-h-screen ${
          dark ? "bg-[#0b132b]" : "bg-white"
        }`}
      >
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    if (!name.trim())
      return Swal.fire("Error", "Name cannot be empty", "error");

    setUpdating(true);
    try {
      await updateUserProfile({ displayName: name, photoURL });
      const res = await fetch(
        `https://contest-hub-server-gold.vercel.app/users/${dbUser?._id || user?.email}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, image: photoURL }),
        }
      );
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
    <div
      className={`min-h-screen relative overflow-hidden ${
        dark ? "bg-[#0b132b] text-gray-100" : "bg-white text-gray-900"
      }`}
    >
      {/* Animated Background */}
      <div
        className={`absolute inset-0 ${
          dark
            ? "bg-[#111c44]/50 animate-pulse"
            : "bg-white/0 animate-pulse"
        }`}
      ></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen p-6">
        <div className="w-full max-w-2xl">
          {/* Main Card */}
          <div
            className={`backdrop-blur-xl rounded-3xl shadow-2xl border p-8 md:p-12 ${
              dark
                ? "bg-[#111c44]/80 border-[#0b132b]"
                : "bg-white border-gray-200"
            }`}
          >
            {/* Avatar */}
            <div className="flex flex-col items-center -mt-20 md:-mt-24">
              <div className="relative">
                <div className="avatar">
                  <div
                    className={`w-32 md:w-40 rounded-full ring ring-primary ring-offset-2 shadow-2xl ${
                      dark ? "ring-offset-[#0b132b]" : "ring-offset-white"
                    }`}
                  >
                    <img
                      src={
                        dbUser?.image ||
                        user?.photoURL ||
                        "https://i.ibb.co/5Yc6f8d/avatar-placeholder.png"
                      }
                      alt="Profile"
                      className="object-cover"
                    />
                  </div>
                </div>
                <div
                  className={`absolute inset-0 rounded-full ${
                    dark
                      ? "bg-primary/20 blur-xl animate-pulse"
                      : "bg-cyan-200/20 blur-xl animate-pulse"
                  }`}
                ></div>
              </div>

              <h1
                className={`mt-6 text-3xl md:text-4xl font-bold ${
                  dark ? "text-gray-100" : "text-gray-900"
                }`}
              >
                {dbUser?.name || user?.displayName}
              </h1>
              <p className={`${dark ? "text-gray-300" : "text-gray-600"} text-lg mt-2`}>
                {user?.email}
              </p>

              {/* Role Badge */}
              <div className="mt-4">
                <span
                  className={`px-6 py-2 rounded-full font-semibold shadow-lg capitalize ${
                    dark ? "bg-[#0b132b] text-gray-100" : "bg-gray-200 text-gray-900"
                  }`}
                >
                  {dbUser?.role || "user"}
                </span>
              </div>

              <button
                onClick={() => setIsEditing(true)}
                className={`mt-8 px-8 py-3 font-bold rounded-full shadow-lg transition duration-300 hover:scale-105 ${
                  dark
                    ? "bg-[#0b132b] text-gray-100 hover:bg-[#111c44]"
                    : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                }`}
              >
                Edit Profile
              </button>
            </div>
          </div>

          {/* Edit Form */}
          {isEditing && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
              <div
                className={`w-full max-w-lg rounded-3xl shadow-2xl border p-8 animate-in fade-in zoom-in duration-300 ${
                  dark
                    ? "bg-[#111c44]/90 border-[#0b132b] text-gray-100"
                    : "bg-white border-gray-200 text-gray-900"
                }`}
              >
                <h2 className="text-2xl font-bold mb-6 text-center">
                  Update Profile
                </h2>

                <form onSubmit={handleUpdateProfile} className="space-y-6">
                  <div>
                    <label className="block mb-2">Name</label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
                        dark
                          ? "bg-[#0b132b] border-[#111c44] text-gray-100 focus:ring-cyan-500"
                          : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-cyan-500"
                      }`}
                      required
                    />
                  </div>

                  <div>
                    <label className="block mb-2">Photo URL</label>
                    <input
                      type="url"
                      value={photoURL}
                      onChange={(e) => setPhotoURL(e.target.value)}
                      placeholder="https://..."
                      className={`w-full px-4 py-3 rounded-xl border focus:outline-none focus:ring-2 ${
                        dark
                          ? "bg-[#0b132b] border-[#111c44] text-gray-100 focus:ring-cyan-500"
                          : "bg-gray-100 border-gray-300 text-gray-900 focus:ring-cyan-500"
                      }`}
                    />
                  </div>

                  {photoURL && (
                    <div className="flex justify-center">
                      <img
                        src={photoURL}
                        alt="Preview"
                        className="w-24 h-24 rounded-full ring-4 ring-cyan-500/50"
                      />
                    </div>
                  )}

                  <div className="flex gap-4 justify-end mt-8">
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className={`px-6 py-3 rounded-xl transition ${
                        dark
                          ? "bg-[#0b132b] text-gray-100 hover:bg-[#111c44]"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={updating}
                      className={`px-8 py-3 rounded-xl font-bold shadow-lg transition hover:scale-105 ${
                        dark
                          ? "bg-[#0b132b] text-gray-100 hover:bg-[#111c44]"
                          : "bg-gray-100 text-gray-900 hover:bg-gray-200"
                      }`}
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
