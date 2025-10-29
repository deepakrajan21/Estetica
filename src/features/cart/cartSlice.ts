import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartState {
  items: CartItem[];
  isOpen: boolean;
}

const initialState: CartState = {
  items: [],
  isOpen: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existing = state.items.find((item) => item.id === action.payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({ ...action.payload, quantity: 1 });
      }
      state.isOpen = true
    },
    removeAllFromCart: (state) => {
      state.items = [];
      state.isOpen = false
    },
    increment: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item) item.quantity += 1;
    },
    decrement: (state, action: PayloadAction<number>) => {
      const item = state.items.find((i) => i.id === action.payload);
      if (item && item.quantity > 1) item.quantity -= 1;
      else if(item?.quantity === 1) state.items = state.items.filter((item) => item.id !== action.payload);
      if (state.items.length === 0) state.isOpen = false
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
      if (state.items.length === 0) state.isOpen = false
    },
    toggleCart: (state) => {
      state.isOpen = !state.isOpen;
    }
  },
});

export const { addToCart, removeAllFromCart, increment, decrement, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;
