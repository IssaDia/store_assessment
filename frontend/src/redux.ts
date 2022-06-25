import { createSlice, configureStore, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuid } from "uuid";
import { ProductInterface } from "./lib/interfaces/ProductInterface";
import { OrderInterface } from "./lib/interfaces/OrderInterface";
import productApi from "./services/ProductsApi";
import orderApi from "./services/OrderApi";

const cartSlice = createSlice({
  name: "cart",
  initialState: [],
  reducers: {
    addToCart: (
      state: ProductInterface[],
      action: PayloadAction<ProductInterface>
    ) => {
      const { payload: product } = action;
      let alreadyInCart = false;
      state.forEach((item: ProductInterface) => {
        if (item.code === action.payload.code) {
          item.count++;
          alreadyInCart = true;
        }
      });
      if (!alreadyInCart) {
        state.push({ ...product, count: 1 });
        console.log("success");
      }
      localStorage.setItem("cartItems", JSON.stringify(state));
    },
    removeFromCart: (state: ProductInterface[], action) => {
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
    [productApi.reducerPath]: productApi.reducer,
    [orderApi.reducerPath]: orderApi.reducer,
  },
});

export const cartSelector = (state: { cart: ProductInterface[] }) => state.cart;
