import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { planService, nomineeService } from "../services/api";
import Loader from "../components/Loader";

const Dashboard = () => {
  const { user } = useAuth();
  const [plan, setPlan] = useState(null);
  const [nominee, setNominee] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const planRes = await planService.getMyPlan();
        setPlan(planRes.data);
      } catch {}
      try {
        const nomineeRes = await nomineeService.getMyNominee();
        setNominee(nomineeRes.data);
      } catch {}
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-50 p-6">
      <div className="max-w-5xl mx-auto">
        {/* Welcome */}
        <div className="bg-slate-800 text-white rounded-2xl p-6 mb-6">
          <h1 className="text-2xl font-bold text-amber-400">
            Welcome, {user?.name} 🕊️
          </h1>
          <p className="text-slate-300 text-sm mt-1">
            Manage your end-of-life plan with care and dignity
          </p>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <Link
            to="/create-plan"
            className="bg-white rounded-xl shadow p-5 hover:shadow-md transition text-center"
          >
            <div className="text-3xl mb-2">📋</div>
            <h3 className="font-semibold text-slate-700">
              {plan ? "Update My Plan" : "Create My Plan"}
            </h3>
            <p className="text-xs text-slate-400 mt-1">Funeral preferences & instructions</p>
          </Link>

          <Link
            to="/providers"
            className="bg-white rounded-xl shadow p-5 hover:shadow-md transition text-center"
          >
            <div className="text-3xl mb-2">🤝</div>
            <h3 className="font-semibold text-slate-700">Service Providers</h3>
            <p className="text-xs text-slate-400 mt-1">Browse verified funeral services</p>
          </Link>

          <Link
            to="/nominee"
            className="bg-white rounded-xl shadow p-5 hover:shadow-md transition text-center"
          >
            <div className="text-3xl mb-2">👨‍👩‍👧</div>
            <h3 className="font-semibold text-slate-700">
              {nominee ? "Update Nominee" : "Add Nominee"}
            </h3>
            <p className="text-xs text-slate-400 mt-1">Assign family member access</p>
          </Link>
        </div>

        {/* Plan Summary */}
        {plan ? (
          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <h2 className="text-lg font-bold text-slate-700 mb-4">📋 My Funeral Plan</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Title</p>
                <p className="font-medium text-slate-700">{plan.title}</p>
              </div>
              <div>
                <p className="text-slate-400">Location</p>
                <p className="font-medium text-slate-700">{plan.preferredLocation || "Not set"}</p>
              </div>
              <div>
                <p className="text-slate-400">Ritual Type</p>
                <p className="font-medium text-slate-700 capitalize">{plan.ritualType}</p>
              </div>
              <div>
                <p className="text-slate-400">Religion</p>
                <p className="font-medium text-slate-700">{plan.religion || "Not set"}</p>
              </div>
              <div>
                <p className="text-slate-400">Budget Estimate</p>
                <p className="font-medium text-slate-700">₹{plan.budgetEstimate?.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-slate-400">Status</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  plan.isFinalized ? "bg-green-100 text-green-700" : "bg-amber-100 text-amber-700"
                }`}>
                  {plan.isFinalized ? "Finalized" : "Draft"}
                </span>
              </div>
            </div>
            <Link
              to="/create-plan"
              className="mt-4 inline-block bg-slate-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-slate-900 transition"
            >
              Edit Plan
            </Link>
          </div>
        ) : (
          <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 mb-6 text-center">
            <p className="text-amber-700 font-medium">No funeral plan created yet.</p>
            <Link
              to="/create-plan"
              className="mt-3 inline-block bg-amber-500 text-white px-6 py-2 rounded-lg text-sm hover:bg-amber-600 transition"
            >
              Create My Plan
            </Link>
          </div>
        )}

        {/* Nominee Summary */}
        {nominee && (
          <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-bold text-slate-700 mb-4">👨‍👩‍👧 Assigned Nominee</h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-slate-400">Name</p>
                <p className="font-medium text-slate-700">{nominee.name}</p>
              </div>
              <div>
                <p className="text-slate-400">Email</p>
                <p className="font-medium text-slate-700">{nominee.email}</p>
              </div>
              <div>
                <p className="text-slate-400">Relationship</p>
                <p className="font-medium text-slate-700">{nominee.relationship}</p>
              </div>
              <div>
                <p className="text-slate-400">Access Code</p>
                <p className="font-mono font-bold text-amber-600">{nominee.accessCode}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
