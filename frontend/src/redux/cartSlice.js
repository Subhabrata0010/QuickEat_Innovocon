import { createSlice } from "@reduxjs/toolkit";

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
      const { menuId } = action.payload;
      const itemIndex = state.cartItems.findIndex((item) => item.menuId === menuId);

      if (itemIndex >= 0) {
        state.cartItems[itemIndex].cartQuantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, cartQuantity: 1 });
      }

      // Store cart in localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    decreaseCartQuantity: (state, action) => {
      const menuId = action.payload;

      const itemIndex = state.cartItems.findIndex((item) => item.menuId === menuId);
      if (itemIndex !== -1) {
        if (state.cartItems[itemIndex].cartQuantity > 1) {
          state.cartItems[itemIndex].cartQuantity -= 1;
        } else {
          state.cartItems.splice(itemIndex, 1);
        }
      }

      // Store cart in localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
    removeFromCart: (state, action) => {
      // Handle both object and string payload
      const menuId = typeof action.payload === 'object' ? action.payload.menuId : action.payload;
      state.cartItems = state.cartItems.filter((item) => item.menuId !== menuId);

      // Store cart in localStorage
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

export const { addToCart, decreaseCartQuantity, removeFromCart } = cartSlice.actions;
export default cartSlice.reducer;