import { useState, useEffect } from "react";
import { nomineeService, planService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

const NomineeAccess = () => {
  const { user } = useAuth();
  const [nominee, setNominee] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", relationship: "",
  });

  // For nominee viewing a plan via access code
  const [accessCode, setAccessCode] = useState("");
  const [plan, setPlan] = useState(null);
  const [accessError, setAccessError] = useState("");

  useEffect(() => {
    const fetchNominee = async () => {
      try {
        const { data } = await nomineeService.getMyNominee();
        setNominee(data);
        setForm({
          name: data.name, email: data.email,
          phone: data.phone || "", relationship: data.relationship || "",
        });
      } catch {}
      setLoading(false);
    };
    fetchNominee();
  }, []);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    try {
      if (nominee) {
        await nomineeService.updateNominee(nominee._id, form);
        setMessage("✅ Nominee updated successfully!");
      } else {
        await nomineeService.addNominee(form);
        setMessage("✅ Nominee added successfully!");
      }
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Failed"));
    }
  };

  const handleNomineeAccess = async (e) => {
    e.preventDefault();
    setAccessError("");
    try {
      const { data } = await nomineeService.nomineeAccess(accessCode);
      // Fetch the plan linked to this nominee's user
      setAccessError("✅ Access granted! " + data.nominee.name);
    } catch (err) {
      setAccessError("❌ Invalid access code. Please try again.");
    }
  };

  if (loading) return <Loader />;

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Add/Update Nominee */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-slate-700 mb-1">
            👨‍👩‍👧 {nominee ? "Update Nominee" : "Add Nominee"}
          </h2>
          <p className="text-slate-400 text-sm mb-6">
            Assign a trusted family member who can access your plan
          </p>

          {message && (
            <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-4 text-sm">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {["name", "email", "phone", "relationship"].map((field) => (
              <div key={field}>
                <label className="block text-sm font-medium text-slate-600 mb-1 capitalize">
                  {field}
                </label>
                <input type={field === "email" ? "email" : "text"}
                  name={field} value={form[field]} onChange={handleChange}
                  required={field !== "phone"}
                  placeholder={`Enter nominee ${field}`}
                  className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
              </div>
            ))}
            <button type="submit"
              className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg font-semibold transition">
              {nominee ? "Update Nominee" : "Add Nominee"}
            </button>
          </form>

          {nominee && (
            <div className="mt-4 bg-amber-50 rounded-lg p-4 text-sm">
              <p className="text-amber-700 font-medium">Access Code for Nominee:</p>
              <p className="font-mono text-2xl font-bold text-amber-600 mt-1">
                {nominee.accessCode}
              </p>
              <p className="text-amber-500 text-xs mt-1">
                Share this code with your nominee to grant them access to your plan.
              </p>
            </div>
          )}
        </div>

        {/* Nominee Plan Access */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <h2 className="text-xl font-bold text-slate-700 mb-1">🔑 Nominee Plan Access</h2>
          <p className="text-slate-400 text-sm mb-6">
            Are you a nominee? Enter your access code to view the plan.
          </p>

          <form onSubmit={handleNomineeAccess} className="space-y-4">
            <input type="text" value={accessCode}
              onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
              placeholder="Enter Access Code (e.g. A1B2C3)"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 font-mono focus:outline-none focus:ring-2 focus:ring-amber-400" />
            <button type="submit"
              className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-semibold transition">
              Access Plan
            </button>
          </form>

          {accessError && (
            <p className="mt-3 text-sm text-center text-slate-600">{accessError}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default NomineeAccess;
