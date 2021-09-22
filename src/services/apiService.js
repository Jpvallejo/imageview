import axios from "axios";
import { apiDomain } from "../assets/constants/api.json";

const BEARER_TOKEN = "token";

const Api = axios.create({
  baseURL: `${apiDomain}`,
});

Api.interceptors.request.use(async (config) => {
  console.log("11111111111111111");

  config.headers.Authorization = " Bearer " + getSavedToken();
  config.headers["Content-Type"] = "application/json";
  return config;
});

const getSavedToken = () => {
  return localStorage.getItem(BEARER_TOKEN);
};

const getBearerToken = () => {
  const Json = {};
  Json.apiKey = process.env.API_KEY || "23567b218376f79d9415";
  Api.post("/auth", Json).then((res) => {
    localStorage.setItem(BEARER_TOKEN, res.data.token);
  });
};

Api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response ? error.response.status : null;
    const originalRequest = error.config;

    if (status === 401) {
      getBearerToken();
      originalRequest.headers["Authorization"] = "Bearer " + getSavedToken();
      return Api(originalRequest);
    } else {
      return Promise.reject(error);
    }
  }
);

export default Api;
