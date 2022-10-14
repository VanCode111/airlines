import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { API_URL } from "../../constants";

const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const api = createApi({
  reducerPath: "api",

  baseQuery: baseQueryWithRetry,

  tagTypes: ["Counter", "Auth", "Schedules"],
  endpoints: () => ({}),
});
