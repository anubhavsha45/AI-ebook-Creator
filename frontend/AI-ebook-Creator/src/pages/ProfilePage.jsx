import { useEffect, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  // 🔥 FETCH PROFILE
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axiosInstance.get("/api/auth/profile");
        setUser(res.data);
        setName(res.data.name);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  // 🔥 UPDATE PROFILE
  const handleUpdate = async () => {
    try {
      setSaving(true);

      const res = await axiosInstance.put("/api/auth/profile", {
        name,
      });

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Profile updated ✅");
    } catch (err) {
      console.error(err);
      alert("Update failed ❌");
    } finally {
      setSaving(false);
    }
  };

  // 🔥 AVATAR UPLOAD
  const handleAvatarUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const res = await axiosInstance.put("/api/auth/profile/avatar", formData);

      setUser(res.data);
      localStorage.setItem("user", JSON.stringify(res.data));

      alert("Avatar updated 🎉");
    } catch (err) {
      console.error(err);
      alert("Upload failed ❌");
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center px-4 py-10">
      <div className="w-full max-w-xl bg-white rounded-xl shadow-md p-6 md:p-8">
        {/* HEADER */}
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Your Profile
        </h1>

        {/* 🔥 AVATAR (UPDATED) */}
        <div className="flex flex-col items-center mb-6">
          <div
            onClick={() => document.getElementById("avatarUpload").click()}
            className="w-20 h-20 rounded-full overflow-hidden cursor-pointer hover:opacity-90"
          >
            {user?.avatar ? (
              <img
                src={`http://localhost:8000${user.avatar}`}
                alt="avatar"
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-violet-600 text-white flex items-center justify-center text-2xl font-bold">
                {user?.name?.charAt(0)}
              </div>
            )}
          </div>

          <p className="text-xs text-gray-500 mt-2">
            Click to change profile photo
          </p>

          <input
            type="file"
            id="avatarUpload"
            className="hidden"
            accept="image/*"
            onChange={handleAvatarUpload}
          />
        </div>

        {/* FORM */}
        <div className="space-y-4">
          {/* NAME */}
          <div>
            <label className="text-sm text-gray-500">Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border rounded-lg p-3 mt-1 focus:ring-2 focus:ring-violet-400 outline-none"
            />
          </div>

          {/* EMAIL */}
          <div>
            <label className="text-sm text-gray-500">Email</label>
            <input
              value={user.email}
              readOnly
              className="w-full border rounded-lg p-3 mt-1 bg-gray-100 text-gray-600"
            />
          </div>

          {/* PLAN */}
          <div>
            <label className="text-sm text-gray-500">Plan</label>
            <div className="mt-1">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  user.isPro
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-200 text-gray-700"
                }`}
              >
                {user.isPro ? "Pro 🚀" : "Free"}
              </span>
            </div>
          </div>
        </div>

        {/* BUTTON */}
        <button
          onClick={handleUpdate}
          disabled={saving}
          className="w-full mt-6 bg-violet-600 text-white py-3 rounded-lg 
          hover:bg-violet-700 transition disabled:opacity-50 cursor-pointer"
        >
          {saving ? "Saving..." : "Save Changes"}
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
