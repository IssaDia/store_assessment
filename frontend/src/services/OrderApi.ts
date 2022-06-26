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
        body: order,
      }),
    }),
    updateOrder: builder.mutation<
      OrderInterface,
      Partial<OrderInterface> & Pick<OrderInterface, "_id">
    >({
      query: ({ _id, ...rest }) => ({
        url: `/api/update/${_id}`,
        method: "PUT",
        body: rest,
      }),
    }),
    getOrders: builder.query<OrderInterface[], void>({
      query: () => `/api/orders`,
    }),
  }),
});

export const {
  useAddOrderMutation,
  useGetOrdersQuery,
  useUpdateOrderMutation,
} = orderApi;

export default orderApi;
