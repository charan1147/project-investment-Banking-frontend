import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
    (response)=>response,(error)=>{
        if(error.response?.status===401){
            localStorage.removeItem("token")
            window.location.herf="/login"
        }
        return Promise.reject(error)
    }
)

export const login = (data) => api.post("/auth/login", data);
export const register = (data) => api.post("/auth/register", data);
export const logout = () => api.post("/auth/logout");
export const getMe = () => api.get("/auth/getme");
export const getInvestments = () => api.get("/investments");
export const addInvestment = (data) => api.post("/investments", data);
export const createPayment = (data) => api.post("/payment/create-intent", data);
export const confirmDeposit = (data) =>
  api.post("/payment/confirm-deposit", data);

export default api;
