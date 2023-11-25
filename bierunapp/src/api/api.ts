import axios, { AxiosInstance } from "axios";

var instance: AxiosInstance;

instance = axios.create({
  baseURL: `http://${import.meta.env.VITE_API_URL}`,
});

export { instance as default };
