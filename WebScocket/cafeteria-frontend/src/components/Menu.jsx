import React, { useEffect, useState } from "react";
import { connectWebSocket, disconnectWebSocket, subscribeToMessages } from "../websocket";

const Menu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    // Connect WebSocket
    connectWebSocket();

    // Subscribe to WebSocket updates
    subscribeToMessages((data) => {
      if (data.action === "menuUpdate") {
        setMenu(data.menu || []);
      }
    });

    return () => {
      disconnectWebSocket();
    };
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📜 Live Menu</h1>
      <table className="border-collapse w-full">
        <thead>
          <tr>
            <th className="border p-2">Item</th>
            <th className="border p-2">Category</th>
            <th className="border p-2">Type</th>
            <th className="border p-2">Price</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Image</th>
          </tr>
        </thead>
        <tbody>
          {menu.length > 0 ? (
            menu.map((item) => (
              <tr key={item.menuId} className="border">
                <td className="p-2">{item.foodName}</td>
                <td className="p-2">{item.category}</td>
                <td className="p-2">{item.type}</td>
                <td className="p-2">₹{item.price}</td>
                <td className="p-2">{item.quantity}</td>
                <td className="p-2">
                  <img src={item["image-url"]} alt={item.foodName} className="w-16 h-16 object-cover" />
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-2 text-center">Loading menu...</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Menu;
