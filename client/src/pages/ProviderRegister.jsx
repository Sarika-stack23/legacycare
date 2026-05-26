import { useState, useEffect } from "react";
import { providerService } from "../services/api";
import { useAuth } from "../context/AuthContext";
import Loader from "../components/Loader";

const ProviderRegister = () => {
  const { user } = useAuth();
  const [existing, setExisting] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const [form, setForm] = useState({
    businessName: "",
    serviceType: "funeral_agency",
    description: "",
    location: "",
    phone: "",
    email: "",
    pricing: {
      basePrice: "",
      pricingDetails: "",
    },
    availability: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === "checkbox" ? checked : value });
  };

  const handlePricingChange = (e) => {
    setForm({
      ...form,
      pricing: { ...form.pricing, [e.target.name]: e.target.value },
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    try {
      if (existing) {
        await providerService.updateProvider(existing._id, form);
        setMessage("✅ Provider profile updated! Awaiting admin verification.");
      } else {
        await providerService.createProvider(form);
        setMessage("✅ Registered successfully! Awaiting admin verification.");
      }
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
          🤝 {existing ? "Update" : "Register as"} Service Provider
        </h2>
        <p className="text-slate-400 text-sm mb-6">
          Join LegacyCare as a verified funeral service provider
        </p>

        {message && (
          <div className="bg-slate-50 border border-slate-200 rounded-lg px-4 py-3 mb-4 text-sm text-slate-700">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Business Name
            </label>
            <input
              type="text"
              name="businessName"
              value={form.businessName}
              onChange={handleChange}
              required
              placeholder="Your business or agency name"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Service Type
            </label>
            <select
              name="serviceType"
              value={form.serviceType}
              onChange={handleChange}
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            >
              <option value="funeral_agency">Funeral Agency</option>
              <option value="transportation">Transportation</option>
              <option value="flowers">Flowers & Decoration</option>
              <option value="catering">Catering</option>
              <option value="priest">Priest / Pandit</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              placeholder="Describe your services..."
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-600 mb-1">
                Location
              </label>
              <input
                type="text"
                name="location"
                value={form.location}
                onChange={handleChange}
                placeholder="City, State"
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
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-600 mb-1">
              Business Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="business@example.com"
              className="w-full border border-slate-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          </div>

          <div className="bg-slate-50 rounded-xl p-4 space-y-3">
            <h3 className="font-semibold text-slate-600 text-sm">
              💰 Pricing Details
            </h3>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Base Price (₹)
              </label>
              <input
                type="number"
                name="basePrice"
                value={form.pricing.basePrice}
                onChange={handlePricingChange}
                placeholder="e.g. 15000"
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-slate-500 mb-1">
                Pricing Details
              </label>
              <textarea
                name="pricingDetails"
                value={form.pricing.pricingDetails}
                onChange={handlePricingChange}
                rows={2}
                placeholder="Describe what's included in the base price..."
                className="w-full border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="availability"
              checked={form.availability}
              onChange={handleChange}
              className="w-4 h-4 accent-amber-500"
            />
            <label className="text-sm text-slate-600">
              Currently Available for Service
            </label>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-slate-800 hover:bg-slate-900 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
          >
            {loading
              ? "Submitting..."
              : existing
              ? "Update Profile"
              : "Register as Provider"}
          </button>
        </form>

        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-700">
          ⚠️ Your profile will be reviewed and verified by the admin before
          appearing in listings.
        </div>
      </div>
    </div>
  );
};

export default ProviderRegister;
