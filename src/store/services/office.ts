import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { RootState } from "../store";
import { API_URL } from "../../constants";

export const officesApi = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  tagTypes: ["Offices"],
  reducerPath: "offices",
  endpoints: (builder) => ({
    getUsersByOffice: builder.query({
      query: (body: { offices: string }) => ({
        url: "getUsersByOffice",
        method: "POST",
        body,
      }),
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }: { id: number }) => ({
                type: "Offices" as const,
                id,
              })),
              { type: "Offices", id: "LIST" },
            ]
          : [{ type: "Offices", id: "LIST" }],
    }),
    getOffices: builder.query({
      query: () => ({
        url: "getOffices",
        method: "POST",
      }),
    }),
    changeBlockUser: builder.mutation({
      query: (body: { email: string }) => ({
        url: "changeBlockUser",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Offices", id: "LIST" }],
    }),
    addUser: builder.mutation({
      query: (body: any) => ({
        url: "addUser",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Offices", id: "LIST" }],
    }),
    changeUserRole: builder.mutation({
      query: (body: any) => ({
        url: "changeUserRole",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "Offices", id: "LIST" }],
    }),
  }),
});

export const {
  useGetOfficesQuery,
  useGetUsersByOfficeQuery,
  useChangeBlockUserMutation,
  useAddUserMutation,
  useChangeUserRoleMutation,
} = officesApi;
