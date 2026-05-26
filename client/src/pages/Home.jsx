import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Hero Section */}
      <section className="bg-slate-800 text-white py-24 px-6 text-center">
        <h1 className="text-5xl font-bold text-amber-400 mb-4">🕊️ LegacyCare</h1>
        <p className="text-xl text-slate-300 mb-2">
          Dignified End-of-Life & Funeral Planning Platform
        </p>
        <p className="text-slate-400 max-w-xl mx-auto mb-8">
          Plan ahead with peace of mind. Ensure your wishes are respected and
          reduce the burden on your loved ones during difficult times.
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            to="/register"
            className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-lg font-semibold transition"
          >
            Start Planning
          </Link>
          <Link
            to="/providers"
            className="border border-amber-400 text-amber-400 hover:bg-amber-400 hover:text-slate-800 px-8 py-3 rounded-lg font-semibold transition"
          >
            View Services
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-6 max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-slate-700 mb-12">
          Why Choose LegacyCare?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              icon: "📋",
              title: "Pre-Plan Everything",
              desc: "Document your funeral preferences, rituals, and instructions in advance.",
            },
            {
              icon: "🤝",
              title: "Verified Service Providers",
              desc: "Access trusted funeral agencies, transportation, and ritual services.",
            },
            {
              icon: "🔒",
              title: "Secure & Private",
              desc: "Your data is encrypted and only shared with authorized nominees.",
            },
            {
              icon: "👨‍👩‍👧",
              title: "Nominee Access",
              desc: "Assign family members who can access your plan when needed.",
            },
            {
              icon: "💰",
              title: "Budget Clarity",
              desc: "Plan your funeral budget in advance with transparent pricing.",
            },
            {
              icon: "🌏",
              title: "Cultural Respect",
              desc: "Honor personal, cultural, and religious preferences with dignity.",
            },
          ].map((feature, i) => (
            <div
              key={i}
              className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-slate-700 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-500 text-sm">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-amber-50 py-16 px-6 text-center">
        <h2 className="text-3xl font-bold text-slate-700 mb-4">
          Start Your Plan Today
        </h2>
        <p className="text-slate-500 mb-8 max-w-lg mx-auto">
          Give your family the gift of clarity. Plan now so they can focus on
          grieving, not logistics.
        </p>
        <Link
          to="/register"
          className="bg-slate-800 hover:bg-slate-900 text-white px-10 py-4 rounded-lg font-semibold transition"
        >
          Create Free Account
        </Link>
      </section>
    </div>
  );
};

export default Home;
