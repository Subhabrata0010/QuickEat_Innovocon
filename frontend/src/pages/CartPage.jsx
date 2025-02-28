import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decreaseCartQuantity, removeFromCart } from "../redux/cartSlice";
import { increaseQuantity } from "../redux/menuSlice";
import { sendWebSocketMessage } from "../websocket";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.cartQuantity,
    0
  );

  const handleDecreaseQuantity = (item) => {
    // First update local state
    dispatch(decreaseCartQuantity(item.menuId));
    dispatch(increaseQuantity(item.menuId));
    
    // Then inform the server about the quantity change
    sendWebSocketMessage({
      action: "updateQuantity",
      menuId: item.menuId,
      newQuantity: item.quantity + 1 // The server needs the new total quantity
    });
  };

  const handleRemoveFromCart = (item) => {
    // Calculate the quantity to return to inventory
    const quantityToReturn = item.cartQuantity;
    
    // Update local state
    dispatch(removeFromCart(item));
    dispatch(increaseQuantity({ id: item.menuId, quantity: quantityToReturn }));
    
    // Inform the server about the quantity change
    sendWebSocketMessage({
      action: "updateQuantity",
      menuId: item.menuId,
      newQuantity: item.quantity + quantityToReturn // The server needs the new total quantity
    });
  };

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div
              key={item.menuId}
              className="bg-white shadow-md p-4 rounded-lg flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold">{item.foodName}</h3>
                <p className="text-gray-700">₹{item.price}</p>
                <p className="text-gray-500">Quantity: {item.cartQuantity}</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleDecreaseQuantity(item)}
                  className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                >
                  -
                </button>
                <button
                  onClick={() => handleRemoveFromCart(item)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
          <h2 className="text-xl font-bold mt-6">
            Total: ₹{totalPrice.toFixed(2)}
          </h2>
        </div>
      )}
    </div>
  );
};

export default CartPage;
