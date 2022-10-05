import axios from "axios";

const API_URL = "https://389d-188-66-38-93.eu.ngrok.io";

export const axiosInstance = axios.create({
  baseURL: API_URL,
});
