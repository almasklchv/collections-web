import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../consts/";
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
    getItemsByCollectionId: build.query<Item[], string>({
      query: (id: string) => `/items/get-all/${id}`,
    }),
    getItemById: build.query<Item, string>({
      query: (id: string) => `/items/${id}`,
    }),
    deleteItem: build.mutation({
      query: (id: string) => ({
        url: `/items/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetRecentlyAddedQuery,
  useGetItemsByCollectionIdQuery,
  useGetItemByIdQuery,
  useDeleteItemMutation,
} = itemsApi;
