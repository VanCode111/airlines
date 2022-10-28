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
  }),
});

export const { useGetAdvancedInformationQuery } = summaryApi;
