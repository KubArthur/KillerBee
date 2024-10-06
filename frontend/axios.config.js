import axios from "axios";
import router from "./src/router";

const TOKEN_ACCESS_KEY = "accessToken";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api/",
});

axiosInstance.defaults.headers.common["Content-Type"] = "text/plain";

axiosInstance.interceptors.request.use(
  (request) => {
    const token = localStorage.getItem(TOKEN_ACCESS_KEY);
    if (token) {
      request.headers["Authorization"] = `Bearer ${token}`;
    } else {
      console.warn("No access token found in localStorage");
    }
    return request;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 444) {
      router.push("/auth");
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
