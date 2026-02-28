import axios from "axios";

/* Create Axios config */
axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

/* Create types */
interface RegisterUser {
  name: string;
  email: string;
  password: string;
}

interface LoginUser {
  email: string;
  password: string;
}

interface Review {
  resumeText: string;
  jobDescriptionText: string;
}

/* Create helpers */
export const checkAuth = async () => {
  const response = await axios.get("/api/auth");
  return response.data;
};

export const register = async (user: RegisterUser) => {
  const response = await axios.post("/api/auth/register", user);
  return response.data;
};

export const login = async (user: LoginUser) => {
  const response = await axios.post("/api/auth/login", user);
  return response.data;
};

export const logout = async () => {
  const response = await axios.post("/api/auth/logout");
  return response.data;
};

export const createReview = async (review: Review) => {
  const response = await axios.post("/api/ai", review);
  return response.data;
};
