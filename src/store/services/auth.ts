import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";

export interface User {
  first_name: string;
  last_name: string;
}

export interface UserResponse {
  user: User;
  token: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "https://59ab-195-239-169-94.eu.ngrok.io/",
  }),
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

export const { useLoginMutation, useHandleCrashMutation } = api;
