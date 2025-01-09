import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://chatease-backend.vercel.app/api",
  withCredentials: true,
});
