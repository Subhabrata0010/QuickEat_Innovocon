import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const CartButton = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const navigate = useNavigate();

  // Calculate total items count
  const totalItems = cartItems.reduce(
    (total, item) => total + item.cartQuantity,
    0
  );

  return (
    <button
      onClick={() => navigate("/cart")}
      className="relative bg-gray-200 p-2 rounded-lg hover:bg-gray-300 transition"
    >
      🛒
      {totalItems > 0 && (
        <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
          {totalItems}
        </span>
      )}
    </button>
  );
};

export default CartButton;
