import axios from "axios";

const API_URL = "https://59ab-195-239-169-94.eu.ngrok.io/";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});
