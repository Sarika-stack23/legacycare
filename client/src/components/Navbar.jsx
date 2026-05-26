import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-slate-800 text-white px-6 py-4 flex justify-between items-center shadow-md">
      <Link to="/" className="text-2xl font-bold text-amber-400">
        🕊️ LegacyCare
      </Link>

      <div className="flex gap-4 items-center flex-wrap">
        <Link to="/providers" className="hover:text-amber-400 transition text-sm">
          Services
        </Link>
        <Link to="/view-plan" className="hover:text-amber-400 transition text-sm">
          Access Plan
        </Link>

        {user ? (
          <>
            <Link to="/dashboard" className="hover:text-amber-400 transition text-sm">
              Dashboard
            </Link>
            <Link to="/documents" className="hover:text-amber-400 transition text-sm">
              Documents
            </Link>
            {user.role === "provider" && (
              <Link to="/provider-register" className="hover:text-amber-400 transition text-sm">
                My Services
              </Link>
            )}
            {user.role === "admin" && (
              <Link to="/admin" className="hover:text-amber-400 transition text-sm">
                Admin
              </Link>
            )}
            <Link to="/profile" className="hover:text-amber-400 transition text-sm">
              👤 {user.name}
            </Link>
            <button
              onClick={handleLogout}
              className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-lg text-sm transition"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" className="hover:text-amber-400 transition text-sm">
              Login
            </Link>
            <Link
              to="/register"
              className="bg-amber-500 hover:bg-amber-600 px-4 py-2 rounded-lg text-sm transition"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
