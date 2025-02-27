import { createSlice } from "@reduxjs/toolkit";

const menuSlice = createSlice({
  name: "menu",
  initialState: {
    menuItems: [],
  },
  reducers: {
    setMenu: (state, action) => {
      // Assuming the data is already in the right format coming from the WebSocket
      // If it's in DynamoDB format, we'd transform it here
      state.menuItems = action.payload;
    },
    reduceQuantity: (state, action) => {
      const itemIndex = state.menuItems.findIndex((item) => item.menuId === action.payload);
      if (itemIndex !== -1 && state.menuItems[itemIndex].quantity > 0) {
        state.menuItems[itemIndex].quantity -= 1;
      }
    },
    increaseQuantity: (state, action) => {
      // Handle both simple ID and object with quantity
      const menuId = typeof action.payload === 'object' ? action.payload.id : action.payload;
      const quantity = typeof action.payload === 'object' ? action.payload.quantity : 1;
      
      const itemIndex = state.menuItems.findIndex((item) => item.menuId === menuId);
      if (itemIndex !== -1) {
        state.menuItems[itemIndex].quantity += quantity;
      }
    },
    updateItemQuantity: (state, action) => {
      // For direct updates from the server
      const { menuId, newQuantity } = action.payload;
      const itemIndex = state.menuItems.findIndex((item) => item.menuId === menuId);
      if (itemIndex !== -1) {
        state.menuItems[itemIndex].quantity = newQuantity;
      }
    }
  },
});

export const { setMenu, reduceQuantity, increaseQuantity, updateItemQuantity } = menuSlice.actions;
export default menuSlice.reducer;