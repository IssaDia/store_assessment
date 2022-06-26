import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ItemInterface } from "../lib/interfaces/ItemInterface";


const url = "http://localhost:8000";

const itemApi = createApi({
  reducerPath: "itemApi",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getItems: builder.query<ItemInterface[], void>({
      query: () => `/api/items`,
    }),
  }),
});

export const { useGetItemsQuery } = itemApi;

export default itemApi
