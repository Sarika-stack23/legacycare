import { useEffect, useState } from "react";
import { adminService } from "../services/api";
import Loader from "../components/Loader";

const AdminDashboard = () => {
  const [stats, setStats] = useState(null);
  const [users, setUsers] = useState([]);
  const [unverifiedProviders, setUnverifiedProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [statsRes, usersRes, providersRes] = await Promise.all([
          adminService.getStats(),
          adminService.getAllUsers(),
          adminService.getUnverifiedProviders(),
        ]);
        setStats(statsRes.data);
        setUsers(usersRes.data);
        setUnverifiedProviders(providersRes.data);
      } catch {}
      setLoading(false);
    };
    fetchData();
  }, []);

  const handleVerify = async (id) => {
    try {
      await adminService.verifyProvider(id);
      setUnverifiedProviders((prev) => prev.filter((p) => p._id !== id));
      setMessage("✅ Provider verified!");
    } catch {
      setMessage("❌ Failed to verify provider");
    }
  };

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await adminService.deleteUser(id);
      setUsers((prev) => prev.filter((u) => u._id !== id));
      setMessage("✅ User deleted!");
    } catch {
      setMessage("❌ Failed to delete user");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold text-slate-700 mb-6">🛡️ Admin Dashboard</h1>

        {message && (
          <div className="bg-slate-100 border border-slate-200 rounded-lg px-4 py-3 mb-4 text-sm">
            {message}
          </div>
        )}

        {/* Stats */}
        {stats && (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-8">
            {[
              { label: "Total Users", value: stats.totalUsers, icon: "👤" },
              { label: "Total Plans", value: stats.totalPlans, icon: "📋" },
              { label: "Finalized Plans", value: stats.completedPlans, icon: "✅" },
              { label: "Total Providers", value: stats.totalProviders, icon: "🤝" },
              { label: "Verified Providers", value: stats.verifiedProviders, icon: "✔️" },
            ].map((stat, i) => (
              <div key={i} className="bg-white rounded-xl shadow p-4 text-center">
                <div className="text-2xl mb-1">{stat.icon}</div>
                <p className="text-2xl font-bold text-slate-700">{stat.value}</p>
                <p className="text-xs text-slate-400">{stat.label}</p>
              </div>
            ))}
          </div>
        )}

        {/* Unverified Providers */}
        <div className="bg-white rounded-xl shadow p-6 mb-6">
          <h2 className="text-lg font-bold text-slate-700 mb-4">
            ⏳ Pending Provider Verification ({unverifiedProviders.length})
          </h2>
          {unverifiedProviders.length === 0 ? (
            <p className="text-slate-400 text-sm">All providers are verified ✅</p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-slate-50">
                    <th className="text-left p-3 text-slate-500">Business</th>
                    <th className="text-left p-3 text-slate-500">Type</th>
                    <th className="text-left p-3 text-slate-500">Location</th>
                    <th className="text-left p-3 text-slate-500">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {unverifiedProviders.map((p) => (
                    <tr key={p._id} className="border-t border-slate-100">
                      <td className="p-3 font-medium text-slate-700">{p.businessName}</td>
                      <td className="p-3 text-slate-500 capitalize">{p.serviceType?.replace("_", " ")}</td>
                      <td className="p-3 text-slate-500">{p.location}</td>
                      <td className="p-3">
                        <button onClick={() => handleVerify(p._id)}
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg text-xs transition">
                          Verify
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* All Users */}
        <div className="bg-white rounded-xl shadow p-6">
          <h2 className="text-lg font-bold text-slate-700 mb-4">
            👥 All Users ({users.length})
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-slate-50">
                  <th className="text-left p-3 text-slate-500">Name</th>
                  <th className="text-left p-3 text-slate-500">Email</th>
                  <th className="text-left p-3 text-slate-500">Role</th>
                  <th className="text-left p-3 text-slate-500">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className="border-t border-slate-100">
                    <td className="p-3 font-medium text-slate-700">{u.name}</td>
                    <td className="p-3 text-slate-500">{u.email}</td>
                    <td className="p-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        u.role === "admin" ? "bg-purple-100 text-purple-700" :
                        u.role === "provider" ? "bg-blue-100 text-blue-700" :
                        "bg-slate-100 text-slate-600"
                      }`}>
                        {u.role}
                      </span>
                    </td>
                    <td className="p-3">
                      {u.role !== "admin" && (
                        <button onClick={() => handleDeleteUser(u._id)}
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg text-xs transition">
                          Delete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
