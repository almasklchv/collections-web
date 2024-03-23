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
  }),
});

export const { useGetFiveBiggestCollectionsQuery } = collectionsApi;
