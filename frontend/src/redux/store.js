import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./userSlice";
import cartReducer from "./cartSlice";
import menuReducer from "./menuSlice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    menu: menuReducer,
  },
});

export default store;
