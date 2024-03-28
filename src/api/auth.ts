import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../entities/user";
import { getHeaders } from "../utils/get-headers";
import { BASE_URL } from "../consts";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: getHeaders,
  }),
  endpoints: (build) => ({
    signUp: build.mutation({
      query: ({ ...post }) => ({
        url: "/auth/sign-up",
        method: "POST",
        body: post,
      }),
    }),
    signIn: build.mutation<{ accessToken: string }, Partial<User>>({
      query: ({ ...post }) => ({
        url: "/auth/sign-in",
        method: "POST",
        body: post,
      }),
    }),
    signOut: build.mutation({
      query: () => "/auth/sign-out",
    }),
    check: build.query({
      query: () => ({
        url: "/auth/check",
      }),
    }),
  }),
});

export const {
  useSignUpMutation,
  useSignInMutation,
  useSignOutMutation,
  useCheckQuery,
} = authApi;
