import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice";
import { reduceQuantity } from "../redux/menuSlice";
import { sendWebSocketMessage } from "../websocket";

const MenuCard = ({ item }) => {
  const dispatch = useDispatch();

  const handleAddToCart = () => {
    if (item.quantity > 0) {
      // First, add to cart locally
      dispatch(addToCart({ menuId: item.menuId, ...item }));
      
      // Then, reduce quantity locally
      dispatch(reduceQuantity(item.menuId));
      
      // Finally, inform the server about the quantity change
      sendWebSocketMessage({
        action: "updateQuantity",
        menuId: item.menuId,
        newQuantity: item.quantity - 1
      });
    } else {
      alert("Out of stock!");
    }
  };

  return (
    <div className="relative bg-white bg-opacity-80 backdrop-blur-lg shadow-lg rounded-xl overflow-hidden p-5 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl">
      <img
        src={item["image-url"] || "https://via.placeholder.com/150"}
        alt={item.foodName}
        className="w-full h-48 object-cover rounded-md mb-4"
      />
      <h3 className="text-xl font-semibold text-gray-800">{item.foodName}</h3>
      <p className="text-gray-600">
        {item.category} - {item.type}
      </p>
      <p className="text-gray-800 font-bold text-lg">₹{item.price}</p>
      <p className="text-gray-500 text-sm">Available: {item.quantity}</p>

      <button
        onClick={handleAddToCart}
        disabled={item.quantity === 0}
        className={`mt-4 w-full py-2 rounded-md text-white font-semibold text-lg transition-all duration-300 ${
          item.quantity > 0
            ? "bg-blue-500 hover:bg-blue-600 hover:shadow-md"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        {item.quantity > 0 ? "Add to Cart" : "Out of Stock"}
      </button>
    </div>
  );
};

export default MenuCard;