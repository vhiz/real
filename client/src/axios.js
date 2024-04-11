import axios from "axios";

export const apiRequest = axios.create({
  baseURL: "https://realestate-o1rr.onrender.com/api",
  withCredentials: true,
});
