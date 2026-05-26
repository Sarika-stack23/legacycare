import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("legacycare_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/login`,
      { email, password }
    );
    setUser(data);
    localStorage.setItem("legacycare_user", JSON.stringify(data));
    return data;
  };

  const register = async (name, email, password, phone, role) => {
    const { data } = await axios.post(
      `${import.meta.env.VITE_API_URL}/api/auth/register`,
      { name, email, password, phone, role }
    );
    setUser(data);
    localStorage.setItem("legacycare_user", JSON.stringify(data));
    return data;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("legacycare_user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
