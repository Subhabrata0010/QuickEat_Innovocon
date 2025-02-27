import { createSlice } from "@reduxjs/toolkit";
import { increaseQuantity } from "./menuSlice"; // ✅ Import increaseQuantity

const loadCartFromStorage = () => {
  const savedCart = localStorage.getItem("cartItems");
  return savedCart ? JSON.parse(savedCart) : [];
};

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: loadCartFromStorage(),
  },
  reducers: {
    addToCart: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload.id
      );
      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, cartQuantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCartQuantity: (state, action) => {
      const itemIndex = state.cartItems.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1) {
        if (state.cartItems[itemIndex].cartQuantity > 1) {
          state.cartItems[itemIndex].cartQuantity -= 1;
        } else {
          state.cartItems.splice(itemIndex, 1);
        }
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      if (item) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload
        );
        increaseQuantity(item.id); // Restore quantity in menu
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, decreaseCartQuantity, removeFromCart } =
  cartSlice.actions;
export default cartSlice.reducer;
