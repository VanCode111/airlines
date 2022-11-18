import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { API_URL } from "../../constants";

export const amenitiesApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),

  reducerPath: "amenities",
  endpoints: (builder) => ({
    getTicketsByReference: builder.query({
      query: (body: any) => ({
        url: "getTicketsByReference",
        method: "POST",
        body,
      }),
    }),
    getAmetitesForTicket: builder.query({
      query: (body: any) => ({
        url: "getAmetitesForTicket",
        method: "POST",
        body,
      }),
    }),
    editAmentitesToTicket: builder.mutation({
      query: (body: any) => ({
        url: "editAmentitesToTicket",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetTicketsByReferenceQuery,
  useLazyGetAmetitesForTicketQuery,
  useEditAmentitesToTicketMutation,
} = amenitiesApi;
