import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../consts/";
import { getHeaders } from "../utils/get-headers";
import { Collection } from "../entities/collection";

export const collectionsApi = createApi({
  reducerPath: "collectionsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    prepareHeaders: getHeaders,
  }),
  endpoints: (build) => ({
    getFiveBiggestCollections: build.query<Collection[], null>({
      query: () => ({
        url: "/collections/big",
      }),
    }),
    getCollectionsByUserId: build.query<Collection[], string>({
      query: (userId: string) => ({
        url: `/collections/${userId}`,
      }),
    }),
    createCollection: build.mutation<Partial<Collection>, Collection>({
      query: ({ ...collection }) => ({
        url: "/collections/",
        method: "POST",
        body: collection,
      }),
    }),
    getCollectionById: build.query<Collection, string>({
      query: (id: string) => `/collections/${id}/by-collection-id`,
    }),
    deleteCollection: build.mutation({
      query: (id: string) => ({
        url: `/collections/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useGetFiveBiggestCollectionsQuery,
  useGetCollectionsByUserIdQuery,
  useCreateCollectionMutation,
  useGetCollectionByIdQuery,
  useDeleteCollectionMutation,
} = collectionsApi;
