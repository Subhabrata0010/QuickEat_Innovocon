import React, { useState, useEffect } from "react";

const API_GATEWAY_URL =
  "wss://n8x16n9r8c.execute-api.ap-south-1.amazonaws.com/dev/"; // WebSocket URL
const API_UPDATE_URL =
  "https://v6yrqnpt1a.execute-api.ap-south-1.amazonaws.com/prod/update"; // Update API URL

const AdminPanel = () => {
  const [menu, setMenu] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = new WebSocket(API_GATEWAY_URL);

    socket.onopen = () => {
      console.log("✅ Connected to WebSocket");
      socket.send(JSON.stringify({ action: "updateMenu" }));
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.action === "menuUpdate") {
        setMenu(data.menu);
        const initialQuantities = {};
        data.menu.forEach((item) => {
          initialQuantities[item.menuId] = item.quantity;
        });
        setQuantities(initialQuantities);
      }
    };

    socket.onclose = () => console.log("❌ WebSocket Disconnected");

    setWs(socket);
    return () => socket.close();
  }, []);

  const handleQuantityChange = (menuId, value) => {
    setQuantities((prev) => ({ ...prev, [menuId]: value }));
  };

  const updateMenuQuantities = async () => {
    const updates = Object.keys(quantities).map((menuId) => ({
      menuId,
      quantity: quantities[menuId],
    }));

    try {
      const response = await fetch(API_UPDATE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updates }),
      });

      if (response.status === 200) {
        alert("✅ Menu updated successfully");
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ action: "updateMenu" }));
        }
      } else {
        alert("❌ Failed to update the menu");
      }
    } catch (error) {
      console.error("❌ Error updating menu:", error);
      alert("❌ Error updating menu");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
        🍽️ Admin Panel - Manage Menu
      </h2>

      {/* Responsive Table Container */}
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-lg rounded-lg overflow-hidden border-collapse">
          <thead>
            <tr className="bg-blue-500 text-white uppercase text-sm leading-normal">
              <th className="py-3 px-6 text-left">Food Name</th>
              <th className="py-3 px-6 text-left">Type</th>
              <th className="py-3 px-6 text-left">Category</th>
              <th className="py-3 px-6 text-left">Price</th>
              <th className="py-3 px-6 text-left">Quantity</th>
            </tr>
          </thead>
          <tbody className="text-gray-700 text-sm font-light">
            {menu.map((item) => (
              <tr
                key={item.menuId}
                className="border-b border-gray-200 hover:bg-gray-100 transition"
              >
                <td className="py-3 px-6">{item.foodName}</td>
                <td className="py-3 px-6">{item.type}</td>
                <td className="py-3 px-6">{item.category}</td>
                <td className="py-3 px-6 font-bold">₹{item.price}</td>
                <td className="py-3 px-6">
                  <input
                    type="number"
                    className="w-20 px-2 py-1 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                    value={quantities[item.menuId] || ""}
                    onChange={(e) =>
                      handleQuantityChange(item.menuId, e.target.value)
                    }
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Update Button */}
      <div className="flex justify-center mt-6">
        <button
          onClick={updateMenuQuantities}
          className="px-6 py-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 transition shadow-lg"
        >
          ✅ Update Menu
        </button>
      </div>
    </div>
  );
};

export default AdminPanel;
