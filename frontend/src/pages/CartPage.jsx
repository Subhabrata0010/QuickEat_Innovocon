import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart, decreaseCartQuantity, clearCart } from "../redux/cartSlice";
import axios from "axios";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cartItems);
  const dispatch = useDispatch();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.cartQuantity,
    0
  );

  const handlePlaceOrder = async () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    try {
      const orderData = {
        items: cartItems.map((item) => ({
          menuId: item.menuId,
          foodName: item.foodName,
          quantity: item.cartQuantity,
          price: item.price,
        })),
        totalAmount: totalPrice,
      };

      const response = await axios.post(API_ORDER_URL, orderData, {
        headers: { "Content-Type": "application/json" },
      });

      if (response.status === 201) {
        alert("✅ Order placed successfully!");
        dispatch(clearCart()); // ✅ Clear cart after successful order
      } else {
        alert("❌ Failed to place the order.");
      }
    } catch (error) {
      console.error("❌ Error placing order:", error);
      alert("❌ Error processing transaction.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">🛒 Your Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty.</p>
      ) : (
        <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-3 px-6 text-left">Food Item</th>
                <th className="py-3 px-6 text-center">Quantity</th>
                <th className="py-3 px-6 text-right">Price</th>
                <th className="py-3 px-6 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.menuId} className="border-b">
                  <td className="py-3 px-6">{item.foodName}</td>
                  <td className="py-3 px-6 text-center">{item.cartQuantity}</td>
                  <td className="py-3 px-6 text-right font-bold">₹{item.price}</td>
                  <td className="py-3 px-6 text-right flex space-x-2">
                    {/* Decrease Quantity Button */}
                    <button
                      onClick={() => dispatch(decreaseCartQuantity(item.menuId))}
                      className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600"
                    >
                      ➖
                    </button>
                    {/* Remove Button */}
                    <button
                      onClick={() => dispatch(removeFromCart(item.menuId))}
                      className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                    >
                      ❌
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-6 flex justify-between items-center">
            <h3 className="text-xl font-bold text-gray-800">Total: ₹{totalPrice}</h3>
            <button
              onClick={handlePlaceOrder}
              className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition shadow-lg"
            >
              ✅ Place Order
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
