import { axiosInstance } from "./utils";

const getAmentitesReport = (body) =>
  axiosInstance.post("/getAmentitesReport", body);

const getCountries = (body) => axiosInstance.post("/getCountries", body);

export default { getAmentitesReport, getCountries };
