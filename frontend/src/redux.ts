import { createSlice, configureStore } from "@reduxjs/toolkit";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { v4 as uuid } from "uuid";
import { ProductInterface } from "./lib/interfaces/ProductInterface";
import { OrderInterface } from "./lib/interfaces/OrderInterface";
import { FetchBaseQueryArgs } from "@reduxjs/toolkit/dist/query/fetchBaseQuery";

const url = "http://localhost:8000";

const productApi = createApi({
  reducerPath: "prdoductApi",
  baseQuery: fetchBaseQuery({ baseUrl: url }),
  endpoints: (builder) => ({
    getProducts: builder.query<ProductInterface[], void>({
      query: () => `/api/products`,
    }),
  }),
});

export const { useGetProductsQuery } = productApi;


const orderSlice = createSlice({
  name: "order",
  initialState: [] ,
  reducers: {
    fetchOrders: (state, action) => {},
    createOrder: (state: OrderInterface[], action) => {
      const unique_id = uuid();
      const order: OrderInterface
       = {
        date: new Date(),
        id: unique_id,
        items : action.payload,
        status: "Pending Approval",
      };
      state.push(order)
    },
    deleteOrder: (state, action) => {
           
           state = state.filter((item: ProductInterface) => item.code !== action.payload);
          
           return state
    },
  },
});

export const store = configureStore({
    reducer: {
        order : orderSlice.reducer,
        [productApi.reducerPath]: productApi.reducer,
    }
})


