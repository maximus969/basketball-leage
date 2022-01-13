import axios from "axios";

export const fetchAPI = () => {
  const instance = axios.create({
    baseURL: "http://dev.trainee.dex-it.ru/api/",
    headers: {
      "content-type": "application/json",
      Authorization: "",
    },
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (!config) {
      config = {};
    }
    if (!config.headers) {
      config.headers = {};
    }
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

  return instance;
};
