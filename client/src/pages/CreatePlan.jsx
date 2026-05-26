import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { planService } from "../services/api";

const CreatePlan = () => {
  const navigate = useNavigate();
  const [existingPlan, setExistingPlan] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    title: "My Funeral Plan",
    preferredLocation: "",
    ritualType: "religious",
    religion: "",
    priestPreference: "",
    ceremonyInstructions: {
      music: "",
      prayers: "",
      customs: "",
      additionalNotes: "",
    },
    budgetEstimate: "",
    isFinalized: false,
  });

  useEffect(() => {
    const fetchPlan = async () => {
      try {
        const { data } = await planService.getMyPlan();
        setExistingPlan(data);
        setForm({
          title: data.title,
          preferredLocation: data.preferredLocation || "",
          ritualType: data.ritualType,
          religion: data.religion || "",
          priestPreference: data.priestPreference || "",
          ceremonyInstructions: data.ceremonyInstructions || {
            music: "", prayers: "", customs: "", additionalNotes: "",
          },
          budgetEstimate: data.budgetEstimate || "",
          isFinalized: data.isFinalized,
        });
      } catch {}
    };
    fetchPlan();
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handleInstructionChange = (e) => {
    setForm({
      ...form,
      ceremonyInstructions: {
        ...form.ceremonyInstructions,
        [e.target.name]: e.target.value,
      },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      if (existingPlan) {
        await planService.updatePlan(existingPlan._id, form);
        setMessage("✅ Plan updated successfully!");
      } else {
        await planService.createPlan(form);
        setMessage("✅ Plan created successfully!");
      }
      setTimeout(() => navigate("/dashboard"), 1500);
    } catch (err) {
      setMessage("❌ " + (err.response?.data?.message || "Something went wrong"));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-slate-700 mb-1">
          📋 {existingPlan ? "Update" : "Create"} Funeral Plan
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Fill in your preferences carefully. You can update anytime.
        </p>

        {message && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-4 text-sm text-slate-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Plan Title</label>
            <input type="text" name="title" value={form.title} onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Preferred Location</label>
            <input type="text" name="preferredLocation" value={form.preferredLocation} onChange={handleChange}
              placeholder="City, State or specific venue"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Ritual Type</label>
              <select name="ritualType" value={form.ritualType} onChange={handleChange}
                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400">
                <option value="religious">Religious</option>
                <option value="non-religious">Non-Religious</option>
                <option value="custom">Custom</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">Religion</label>
              <input type="text" name="religion" value={form.religion} onChange={handleChange}
                placeholder="e.g. Hindu, Muslim, Christian"
                className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Priest / Pandit Preference</label>
            <input type="text" name="priestPreference" value={form.priestPreference} onChange={handleChange}
              placeholder="Name or type of priest preferred"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>

          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-slate-600 text-sm">🎵 Ceremony Instructions</h3>
            {["music", "prayers", "customs", "additionalNotes"].map((field) => (
              <div key={field}>
                <label className="block text-xs font-medium text-slate-500 mb-1 capitalize">
                  {field === "additionalNotes" ? "Additional Notes" : field}
                </label>
                <textarea name={field} value={form.ceremonyInstructions[field]}
                  onChange={handleInstructionChange} rows={2}
                  className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                  placeholder={`Enter ${field} instructions...`} />
              </div>
            ))}
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">Budget Estimate (₹)</label>
            <input type="number" name="budgetEstimate" value={form.budgetEstimate} onChange={handleChange}
              placeholder="e.g. 50000"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400" />
          </div>

          <div className="flex items-center gap-2">
            <input type="checkbox" name="isFinalized" checked={form.isFinalized}
              onChange={handleChange} className="w-4 h-4 accent-amber-500" />
            <label className="text-sm text-slate-600">Mark this plan as Finalized</label>
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60">
            {loading ? "Saving..." : existingPlan ? "Update Plan" : "Create Plan"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePlan;
