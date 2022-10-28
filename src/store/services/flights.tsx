import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { API_URL } from "../../constants";

export const flightsApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["Counter"],
  reducerPath: "flights",
  endpoints: (builder) => ({
    getFlightsForBooking: builder.query({
      query: (body) => ({
        url: "getFlightsForBooking",
        method: "POST",
        body,
      }),
    }),
    getAirportsCodes: builder.query({
      query: () => ({
        url: "getAirportsCodes",
        method: "POST",
      }),
    }),
    getCabinTypes: builder.query({
      query: () => ({
        url: "getCabinTypes",
        method: "POST",
      }),
    }),
    createTickets: builder.mutation({
      query: (body) => ({
        url: "createTickets",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetFlightsForBookingQuery,
  useGetAirportsCodesQuery,
  useGetCabinTypesQuery,
  useCreateTicketsMutation,
} = flightsApi;
