import { axiosInstance } from "./axiosConfig";

export const login = async (body: { email: string; password: string }) => {
  return axiosInstance.post("login", body);
};
