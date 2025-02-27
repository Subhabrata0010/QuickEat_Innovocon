import { createSlice } from "@reduxjs/toolkit";

// Load menu from localStorage or use initial data
const loadMenuFromStorage = () => {
  const savedMenu = localStorage.getItem("menuItems");
  return savedMenu
    ? JSON.parse(savedMenu)
    : [
        { id: 1, name: "Veg Burger", price: 99, quantity: 10 },
        { id: 2, name: "Cheese Pizza", price: 199, quantity: 5 },
        { id: 3, name: "French Fries", price: 79, quantity: 8 },
      ];
};

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuItems: loadMenuFromStorage(),
  },
  reducers: {
    reduceQuantity: (state, action) => {
      const itemIndex = state.menuItems.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1 && state.menuItems[itemIndex].quantity > 0) {
        state.menuItems[itemIndex].quantity -= 1;
        localStorage.setItem("menuItems", JSON.stringify(state.menuItems)); // Save updated state
      }
    },
    increaseQuantity: (state, action) => {
      const itemIndex = state.menuItems.findIndex(
        (item) => item.id === action.payload
      );
      if (itemIndex !== -1) {
        state.menuItems[itemIndex].quantity += 1; // Restore quantity
        localStorage.setItem("menuItems", JSON.stringify(state.menuItems)); // Save updated state
      }
    },
  },
});

export const { reduceQuantity, increaseQuantity } = menuSlice.actions;
export default menuSlice.reducer;
