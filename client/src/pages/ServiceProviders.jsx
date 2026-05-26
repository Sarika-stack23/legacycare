import { useEffect, useState } from "react";
import { providerService } from "../services/api";
import Loader from "../components/Loader";

const serviceTypes = [
  { value: "", label: "All Services" },
  { value: "funeral_agency", label: "Funeral Agency" },
  { value: "transportation", label: "Transportation" },
  { value: "flowers", label: "Flowers & Decoration" },
  { value: "catering", label: "Catering" },
  { value: "priest", label: "Priest / Pandit" },
  { value: "other", label: "Other" },
];

const ServiceProviders = () => {
  const [providers, setProviders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    const fetchProviders = async () => {
      setLoading(true);
      try {
        const { data } = await providerService.getAllProviders(filter);
        setProviders(data);
      } catch {}
      setLoading(false);
    };
    fetchProviders();
  }, [filter]);

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-bold text-slate-700 mb-2">🤝 Service Providers</h2>
        <p className="text-slate-400 text-sm mb-6">
          Browse verified funeral and ritual service providers
        </p>

        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          {serviceTypes.map((type) => (
            <button key={type.value}
              onClick={() => setFilter(type.value)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition ${
                filter === type.value
                  ? "bg-slate-800 text-white"
                  : "bg-white text-slate-600 border border-slate-300 hover:bg-slate-100"
              }`}>
              {type.label}
            </button>
          ))}
        </div>

        {loading ? <Loader /> : (
          providers.length === 0 ? (
            <div className="text-center text-slate-400 py-20">
              No providers found for this category.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {providers.map((p) => (
                <div key={p._id} className="bg-white rounded-xl shadow p-5 hover:shadow-md transition">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-slate-700">{p.businessName}</h3>
                    <span className="text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full capitalize">
                      {p.serviceType?.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-slate-500 text-sm mb-3">{p.description}</p>
                  <div className="text-sm space-y-1">
                    <p className="text-slate-400">📍 {p.location}</p>
                    <p className="text-slate-400">📞 {p.phone}</p>
                    <p className="text-amber-600 font-semibold">
                      ₹{p.pricing?.basePrice?.toLocaleString()} base price
                    </p>
                  </div>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-xs text-green-600 font-medium">✅ Verified</span>
                    <span className="text-xs text-slate-400">⭐ {p.rating}/5</span>
                  </div>
                </div>
              ))}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ServiceProviders;
