import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { authService } from "../services/api";

const Profile = () => {
  const { user, login } = useAuth();
  const [form, setForm] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    password: "",
    confirmPassword: "",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (form.password && form.password !== form.confirmPassword) {
      setMessage("❌ Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const updateData = {
        name: form.name,
        email: form.email,
        phone: form.phone,
      };
      if (form.password) updateData.password = form.password;

      await authService.updateProfile(updateData);
      setMessage("✅ Profile updated successfully!");
      setForm({ ...form, password: "", confirmPassword: "" });
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Update failed"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        {/* Avatar */}
        <div className="text-center mb-6">
          <div className="w-20 h-20 bg-slate-800 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">
            👤
          </div>
          <h2 className="text-xl font-bold text-slate-700">{user?.name}</h2>
          <span
            className={`text-xs px-3 py-1 rounded-full font-medium ${
              user?.role === "admin"
                ? "bg-purple-100 text-purple-700"
                : user?.role === "provider"
                ? "bg-blue-100 text-blue-700"
                : "bg-amber-100 text-amber-700"
            }`}
          >
            {user?.role?.toUpperCase()}
          </span>
        </div>

        <h3 className="text-lg font-bold text-slate-700 mb-1">
          ✏️ Edit Profile
        </h3>
        <p className="text-slate-400 text-sm mb-6">
          Update your personal information
        </p>

        {message && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-4 text-sm text-slate-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Full Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Phone
            </label>
            <input
              type="text"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 99999 99999"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="border-t border-slate-100 pt-4">
            <p className="text-sm font-medium text-slate-500 mb-3">
              🔒 Change Password (leave blank to keep current)
            </p>
            <div className="space-y-3">
              <input
                type="password"
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="New password"
                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
              <input
                type="password"
                name="confirmPassword"
                value={form.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm new password"
                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
          >
            {loading ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
