import axios from "axios";

const api = axios.create({
  baseURL: "https://localhost:7056", 
  // ajuste a porta conforme seu backend
});

export default api;