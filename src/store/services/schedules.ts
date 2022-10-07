import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://59ab-195-239-169-94.eu.ngrok.io/",
  }),
  endpoints: (builder) => ({
    getSchedules: builder.query({
      query: (params) => ({
        url: "getAllAgeGroup",

        mode: "no-cors",
        params,
      }),
    }),
  }),
});

export const { useGetSchedulesQuery } = api;
