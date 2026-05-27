import { useState } from "react";
import { nomineeService } from "../services/api";

const ViewPlan = () => {
  const [accessCode, setAccessCode] = useState("");
  const [plan, setPlan] = useState(null);
  const [nominee, setNominee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleAccess = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setPlan(null);
    setNominee(null);
    try {
      const { data } = await nomineeService.nomineeAccess(accessCode);
      setNominee(data.nominee);
      setPlan(data.plan || null);
    } catch (err) {
      setError("❌ Invalid access code. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 py-10 px-4">
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Access Code Entry */}
        {!nominee && (
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold text-slate-700 mb-1">
              🔑 Access Funeral Plan
            </h2>
            <p className="text-slate-400 text-sm mb-6">
              Enter the access code shared with you to view the funeral plan
            </p>
            <form onSubmit={handleAccess} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-600 mb-1">
                  Access Code
                </label>
                <input
                  type="text"
                  value={accessCode}
                  onChange={(e) => setAccessCode(e.target.value.toUpperCase())}
                  placeholder="Enter code (e.g. A1B2C3)"
                  maxLength={12}
                  className="w-full border border-slate-300 rounded-lg px-4 py-3 font-mono text-lg tracking-widest text-center focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
              </div>
              {error && (
                <p className="text-red-500 text-sm text-center">{error}</p>
              )}
              <button
                type="submit"
                disabled={loading || !accessCode}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-60"
              >
                {loading ? "Verifying..." : "Access Plan"}
              </button>
            </form>
            <div className="mt-6 bg-slate-50 rounded-lg p-4 text-sm text-slate-500">
              <p className="font-medium text-slate-600 mb-1">📌 Note:</p>
              <p>
                The access code was shared with you by your family member. It
                allows you to view their end-of-life plan and contact service
                providers listed in it.
              </p>
            </div>
          </div>
        )}

        {/* Plan View after access */}
        {nominee && (
          <div className="space-y-4">
            {/* Welcome */}
            <div className="bg-slate-800 text-white rounded-2xl p-6">
              <h2 className="text-xl font-bold text-amber-400">
                ✅ Access Granted
              </h2>
              <p className="text-slate-300 text-sm mt-1">
                Welcome, {nominee.name}. You now have access to the funeral plan.
              </p>
            </div>

            {/* Nominee Info */}
            <div className="bg-white rounded-xl shadow p-6">
              <h3 className="font-bold text-slate-700 mb-4">
                👤 Your Details
              </h3>
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
                  <p className="font-medium text-slate-700">
                    {nominee.relationship || "Not specified"}
                  </p>
                </div>
                <div>
                  <p className="text-slate-400">Access Status</p>
                  <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-700">
                    ✅ Active
                  </span>
                </div>
              </div>
            </div>

            {/* Plan Display */}
            {plan ? (
              <div className="bg-white rounded-xl shadow p-6">
                <h3 className="font-bold text-slate-700 mb-4">
                  📋 Funeral Plan Details
                </h3>
                <div className="space-y-4 text-sm">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-slate-400">Plan Title</p>
                      <p className="font-medium text-slate-700">{plan.title}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Location</p>
                      <p className="font-medium text-slate-700">
                        {plan.preferredLocation || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400">Ritual Type</p>
                      <p className="font-medium text-slate-700 capitalize">
                        {plan.ritualType}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400">Religion</p>
                      <p className="font-medium text-slate-700">
                        {plan.religion || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400">Priest Preference</p>
                      <p className="font-medium text-slate-700">
                        {plan.priestPreference || "Not specified"}
                      </p>
                    </div>
                    <div>
                      <p className="text-slate-400">Budget Estimate</p>
                      <p className="font-medium text-amber-600">
                        ₹{plan.budgetEstimate?.toLocaleString() || "0"}
                      </p>
                    </div>
                  </div>

                  {/* Ceremony Instructions */}
                  {plan.ceremonyInstructions && (
                    <div className="bg-slate-50 rounded-lg p-4 space-y-2">
                      <h4 className="font-semibold text-slate-600">
                        🎵 Ceremony Instructions
                      </h4>
                      {plan.ceremonyInstructions.music && (
                        <p>
                          <span className="text-slate-400">Music: </span>
                          {plan.ceremonyInstructions.music}
                        </p>
                      )}
                      {plan.ceremonyInstructions.prayers && (
                        <p>
                          <span className="text-slate-400">Prayers: </span>
                          {plan.ceremonyInstructions.prayers}
                        </p>
                      )}
                      {plan.ceremonyInstructions.customs && (
                        <p>
                          <span className="text-slate-400">Customs: </span>
                          {plan.ceremonyInstructions.customs}
                        </p>
                      )}
                      {plan.ceremonyInstructions.additionalNotes && (
                        <p>
                          <span className="text-slate-400">Notes: </span>
                          {plan.ceremonyInstructions.additionalNotes}
                        </p>
                      )}
                    </div>
                  )}

                  {/* Selected Providers */}
                  {plan.selectedProviders && 
                   plan.selectedProviders.length > 0 && (
                    <div className="bg-amber-50 rounded-lg p-4">
                      <h4 className="font-semibold text-slate-600 mb-2">
                        🤝 Selected Service Providers
                      </h4>
                      <div className="space-y-2">
                        {plan.selectedProviders.map((sp, i) => (
                          <div key={i}
                            className="flex justify-between items-center bg-white rounded-lg px-3 py-2 text-sm">
                            <span className="font-medium text-slate-700">
                              ✅ {sp.provider?.businessName || "Provider"}
                            </span>
                            <span className="text-slate-400">
                              📞 {sp.provider?.phone || ""}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="bg-amber-50 border border-amber-200 rounded-xl p-6 text-center">
                <p className="text-amber-700">
                  No funeral plan has been created yet by the plan owner.
                </p>
              </div>
            )}

            {/* Contact Note */}
            <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 text-sm text-blue-700">
              <p className="font-medium mb-1">📞 Next Steps</p>
              <p>
                Please contact the listed service providers and coordinate
                arrangements as per the instructions above.
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ViewPlan;