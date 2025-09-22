import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000", // must match backend
});


export default api;
