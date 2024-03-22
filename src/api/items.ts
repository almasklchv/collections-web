import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../consts/base-url-api";
import { getHeaders } from "../utils/get-headers";
import { Item } from "../entities/item";

export const itemsApi = createApi({
  reducerPath: "itemsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: getHeaders,
  }),
  endpoints: (build) => ({
    getRecentlyAdded: build.query<Item[], null>({
      query: () => ({
        url: "/items/recent",
      }),
    }),
  }),
});

export const { useGetRecentlyAddedQuery } = itemsApi;
