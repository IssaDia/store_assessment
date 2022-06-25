import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { OrderInterface } from "../lib/interfaces/OrderInterface";

const url = "http://localhost:8000";

const orderApi = createApi({
  reducerPath: "orderApi",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    addOrder: builder.mutation<OrderInterface, Partial<OrderInterface>>({
      query: (order) => ({
        url: `/api/order/new`,
        method: "POST",
        order,
      }),
    }),
  }),
});

export const { useAddOrderMutation } = orderApi;

export default orderApi;

