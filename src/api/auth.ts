import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../consts/base-url-api";
import { User } from "../entities/user";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', token)
      }
      return headers;
    }
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
    check: build.query({
      query: () => ({
        url: "/auth/check",
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useCheckQuery } = authApi;
