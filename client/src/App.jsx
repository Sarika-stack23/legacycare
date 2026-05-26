import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ProtectedRoute from "./utils/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreatePlan from "./pages/CreatePlan";
import ServiceProviders from "./pages/ServiceProviders";
import NomineeAccess from "./pages/NomineeAccess";
import AdminDashboard from "./pages/AdminDashboard";
import DocumentUpload from "./pages/DocumentUpload";
import ProviderRegister from "./pages/ProviderRegister";
import ViewPlan from "./pages/ViewPlan";
import Profile from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/providers" element={<ServiceProviders />} />
              <Route path="/view-plan" element={<ViewPlan />} />
              <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
              <Route path="/create-plan" element={<ProtectedRoute><CreatePlan /></ProtectedRoute>} />
              <Route path="/nominee" element={<ProtectedRoute><NomineeAccess /></ProtectedRoute>} />
              <Route path="/documents" element={<ProtectedRoute><DocumentUpload /></ProtectedRoute>} />
              <Route path="/provider-register" element={<ProtectedRoute roles={["provider"]}><ProviderRegister /></ProtectedRoute>} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              <Route path="/admin" element={<ProtectedRoute roles={["admin"]}><AdminDashboard /></ProtectedRoute>} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
