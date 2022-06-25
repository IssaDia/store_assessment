import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ProductInterface } from "../lib/interfaces/ProductInterface";


const url = "http://localhost:8000";

const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductInterface[], void>({
      query: () => `/api/products`,
    }),
  }),
});

export const { useGetProductsQuery } = productApi;

export default productApi
