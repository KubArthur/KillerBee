import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

axiosInstance.defaults.headers.common["Content-Type"] = "text/plain";

export default axiosInstance;
