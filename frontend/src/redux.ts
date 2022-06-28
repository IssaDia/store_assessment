import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { ItemInterface } from "./lib/interfaces/ItemInterface";
import { OrderInterface } from "./lib/interfaces/OrderInterface";
import itemApi from "./services/ItemsApi";
import orderApi from "./services/OrderApi";

const cartSlice = createSlice({
  name: "cart",
  initialState: JSON.parse(localStorage.getItem("cartItems") || "{}"),
  reducers: {
    addToCart: (
      state: ItemInterface[],
      action: PayloadAction<ItemInterface>
    ) => {
      const { payload: item } = action;
      let alreadyInCart = false;
      state.forEach((item: ItemInterface) => {
        if (item.code === action.payload.code) {
          item.quantity++;
          alreadyInCart = true;
        }
      });
      if (!alreadyInCart) {
        state.push({ ...item, quantity: 1 });
      }

      localStorage.setItem("cartItems", JSON.stringify(state));
      return state;
    },
    removeFromCart: (state: ItemInterface[], action) => {
      state = state.filter((item) => item.code !== action.payload);
      localStorage.setItem(
        "cartItems",
        JSON.stringify(state.filter((item) => item.code !== action.payload))
      );
      return state;
    },
  },
});

const orderSlice = createSlice({
  name: "order",
  initialState: [],
  reducers: {
    addToOrder: (
      state: OrderInterface[],
      action: PayloadAction<OrderInterface>
    ) => {
      const { payload: order } = action;
      let alreadyInCart = false;
      state.forEach((order: OrderInterface) => {
        if (order._id === action.payload._id) {
          alreadyInCart = true;
        }
      });
      if (!alreadyInCart) {
        state.push({ ...order });
      }
      localStorage.setItem("orders", JSON.stringify(state));
    },
  },
});

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    order: orderSlice.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export const cartSelector = (state: { cart: ItemInterface[] }) => state.cart;
export const orderSelector = (state: { order: OrderInterface[] }) =>
  state.order;
