import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { reduceQuantity } from "../redux/menuSlice";

const MenuCard = ({ item }) => {
  const dispatch = useDispatch();

  // Get updated quantity from Redux
  const menuItem = useSelector((state) =>
    state.menu.menuItems.find((menuItem) => menuItem.id === item.id)
  );

  const handleAddToCart = () => {
    if (menuItem.quantity > 0) {
      dispatch(addToCart(menuItem));
      dispatch(reduceQuantity(menuItem.id)); // Reduce available quantity
    } else {
      alert("Out of stock!");
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 w-64 text-center">
      <h3 className="text-lg font-semibold">{menuItem.name}</h3>
      <p className="text-gray-700 font-medium">₹{menuItem.price}</p>
      <p className="text-gray-500 text-sm">
        Available: <span className="font-bold">{menuItem.quantity}</span>
      </p>
      <button
        onClick={handleAddToCart}
        disabled={menuItem.quantity === 0}
        className={`mt-3 w-full py-2 rounded-md text-white ${
          menuItem.quantity > 0
            ? "bg-blue-500 hover:bg-blue-600"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {menuItem.quantity > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
};

export default MenuCard;
