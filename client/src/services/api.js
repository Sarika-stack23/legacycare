import axios from "axios";

const API = import.meta.env.VITE_API_URL;

const getHeaders = () => {
  const user = JSON.parse(localStorage.getItem("legacycare_user"));
  return { Authorization: `Bearer ${user?.token}` };
};

// Auth Services
export const authService = {
  register: (data) => axios.post(`${API}/api/auth/register`, data),
  login: (data) => axios.post(`${API}/api/auth/login`, data),
  getProfile: () => axios.get(`${API}/api/auth/profile`, { headers: getHeaders() }),
  updateProfile: (data) => axios.put(`${API}/api/auth/profile`, data, { headers: getHeaders() }),
};

// Plan Services
export const planService = {
  createPlan: (data) => axios.post(`${API}/api/plans`, data, { headers: getHeaders() }),
  getMyPlan: () => axios.get(`${API}/api/plans/my`, { headers: getHeaders() }),
  getPlanById: (id) => axios.get(`${API}/api/plans/${id}`, { headers: getHeaders() }),
  updatePlan: (id, data) => axios.put(`${API}/api/plans/${id}`, data, { headers: getHeaders() }),
  deletePlan: (id) => axios.delete(`${API}/api/plans/${id}`, { headers: getHeaders() }),
  getAllPlans: () => axios.get(`${API}/api/plans`, { headers: getHeaders() }),
};

// Provider Services
export const providerService = {
  getAllProviders: (serviceType) =>
    axios.get(`${API}/api/providers${serviceType ? `?serviceType=${serviceType}` : ""}`),
  getProviderById: (id) => axios.get(`${API}/api/providers/${id}`),
  createProvider: (data) => axios.post(`${API}/api/providers`, data, { headers: getHeaders() }),
  updateProvider: (id, data) => axios.put(`${API}/api/providers/${id}`, data, { headers: getHeaders() }),
};

// Nominee Services
export const nomineeService = {
  addNominee: (data) => axios.post(`${API}/api/nominees`, data, { headers: getHeaders() }),
  getMyNominee: () => axios.get(`${API}/api/nominees/my`, { headers: getHeaders() }),
  nomineeAccess: (accessCode) => axios.post(`${API}/api/nominees/access`, { accessCode }),
  updateNominee: (id, data) => axios.put(`${API}/api/nominees/${id}`, data, { headers: getHeaders() }),
};

// Admin Services
export const adminService = {
  getAllUsers: () => axios.get(`${API}/api/admin/users`, { headers: getHeaders() }),
  deleteUser: (id) => axios.delete(`${API}/api/admin/users/${id}`, { headers: getHeaders() }),
  verifyProvider: (id) => axios.put(`${API}/api/admin/providers/${id}/verify`, {}, { headers: getHeaders() }),
  getUnverifiedProviders: () => axios.get(`${API}/api/admin/providers/unverified`, { headers: getHeaders() }),
  getStats: () => axios.get(`${API}/api/admin/stats`, { headers: getHeaders() }),
};
