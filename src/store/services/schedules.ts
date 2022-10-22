import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { API_URL } from "../../constants";

export const scheduleApi = createApi({
  tagTypes: ["Schedules"],
  reducerPath: "schedules",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getSchedules: builder.query({
      query: (body: any) => ({
        url: "getSchedule",
        method: "POST",
        body,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: number }) => ({
                type: "Schedules" as const,
                id,
              })),
              { type: "Schedules", id: "LIST" },
            ]
          : [{ type: "Schedules", id: "LIST" }],
    }),
    changeFlightConfirm: builder.mutation({
      query: (body: any) => ({
        url: "changeFlightConfirm",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Schedules", id: "LIST" }],
    }),
    updateFlight: builder.mutation({
      query: (body: any) => ({
        url: "updateFlight",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Schedules", id: "LIST" }],
    }),
  }),
});

export const {
  useGetSchedulesQuery,
  useChangeFlightConfirmMutation,
  useUpdateFlightMutation,
} = scheduleApi;
