import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { ItemInterface } from "./lib/interfaces/ItemInterface";
import { OrderInterface } from "./lib/interfaces/OrderInterface";
import itemApi from "./services/ItemsApi";
import orderApi from "./services/OrderApi";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
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
        console.log("success");
      }
      localStorage.setItem("cartItems", JSON.stringify(state));
    },
    removeFromCart: (state: ItemInterface[], action) => {
      state = state.filter((item) => item.code !== action.payload);
      localStorage.setItem(
        "cart",
        JSON.stringify(state.filter((item) => item.code !== action.payload))
      );
      return state;
    },
  },
});

export const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
    [itemApi.reducerPath]: itemApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
});

export const cartSelector = (state: { cart: ItemInterface[] }) => state.cart;
