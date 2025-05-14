import axios from 'axios'


const axiosInstance = axios.create({
  baseURL: "http://192.168.130.168:5000", // Replace with your actual backend URL
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem("token")
      window.location.href = "/login"; // Redirect to login on 401 error
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
