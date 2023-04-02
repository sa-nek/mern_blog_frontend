import axios from "axios";
const ax = axios.create({
  baseURL: "https://bloggies-api.onrender.com",
});

ax.interceptors.request.use((config) => {
  config.headers.Authorization = localStorage.getItem("token");

  return config;
});

export default ax;
