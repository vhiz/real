import axios from "axios";

export const apiRequest = axios.create({
  baseURL: "https://real-z0s3.onrender.com/api",
  withCredentials: true,
});
