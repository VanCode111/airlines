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
  }),
});

export const { useGetTicketsByReferenceQuery } = amenitiesApi;
