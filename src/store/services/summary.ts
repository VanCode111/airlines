import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { API_URL } from "../../constants";

export const summaryApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["summary"],
  reducerPath: "summary",
  endpoints: (builder) => ({
    getAdvancedInformation: builder.query({
      query: (body: any) => ({
        url: "getAdvancedInformation",
        method: "POST",
        body,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: number }) => ({
                type: "summary" as const,
                id,
              })),
              { type: "summary", id: "LIST" },
            ]
          : [{ type: "summary", id: "LIST" }],
    }),
    getAllAgeGroup: builder.query({
      query: () => ({
        url: "getAllAgeGroup",
        method: "POST",
      }),
    }),
    getAllGenders: builder.query({
      query: () => ({
        url: "getAllGenders",
        method: "POST",
      }),
    }),
    getSummaryTimePeriods: builder.query({
      query: () => ({
        url: "getSummaryTimePeriods",
        method: "POST",
      }),
    }),
    getDefaultSummary: builder.query({
      query: () => ({
        url: "getDefaultSummary",
        method: "POST",
      }),
    }),
  }),
});

export const {
  useGetAdvancedInformationQuery,
  useGetAllGendersQuery,
  useGetAllAgeGroupQuery,
  useGetSummaryTimePeriodsQuery,
  useGetDefaultSummaryQuery,
} = summaryApi;
