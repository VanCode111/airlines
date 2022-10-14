import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { API_URL } from "../../constants";

export const authApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (credentials) => ({
        url: "login",
        method: "POST",
        body: credentials,
      }),
    }),
    handleCrash: builder.mutation({
      query: (body) => ({
        url: "crashHandler",
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const { useLoginMutation, useHandleCrashMutation } = authApi;
