import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../consts/";
import { getHeaders } from "../utils/get-headers";

export const usersApi = createApi({
  reducerPath: "usersApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: getHeaders,
  }),
  endpoints: (build) => ({
    getUser: build.mutation({
      query: (idOrEmail: string) => ({
        url: `/users/${idOrEmail}`,
        method: "GET",
      }),
    }),
  }),
});

export const { useGetUserMutation } = usersApi;
