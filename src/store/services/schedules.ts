import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { API_URL } from "../../constants";

export const scheduleApi = createApi({
  tagTypes: ["Schedules"],
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getSchedules: builder.mutation({
      query: () => ({
        url: "getSchedule",
        method: "POST",
      }),
    }),
  }),
});

export const { useGetSchedulesMutation } = scheduleApi;
