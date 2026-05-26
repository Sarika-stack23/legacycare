const Footer = () => {
  return (
    <footer className="bg-slate-800 text-slate-300 text-center py-6 mt-auto">
      <p className="text-sm">
        🕊️ <span className="text-amber-400 font-semibold">LegacyCare</span> —
        Dignified End-of-Life Planning Platform
      </p>
      <p className="text-xs mt-1 text-slate-500">
        © {new Date().getFullYear()} LegacyCare. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
