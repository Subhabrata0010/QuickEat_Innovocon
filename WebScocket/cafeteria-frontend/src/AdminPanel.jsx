import React, { useState, useEffect } from "react";

const API_GATEWAY_URL = "wss://n8x16n9r8c.execute-api.ap-south-1.amazonaws.com/dev/"; // WebSocket URL
const API_UPDATE_URL = "https://v6yrqnpt1a.execute-api.ap-south-1.amazonaws.com/prod/update"; // Update API URL

const AdminPanel = () => {
  const [menu, setMenu] = useState([]);
  const [quantities, setQuantities] = useState({});
  const [ws, setWs] = useState(null);

  useEffect(() => {
    // Establish WebSocket connection
    const socket = new WebSocket(API_GATEWAY_URL);

    socket.onopen = () => {
      console.log("Connected to WebSocket");
      socket.send(JSON.stringify({ action: "updateMenu" })); // Request menu on connect
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

    socket.onclose = () => console.log("WebSocket Disconnected");

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

    // Call the API to update the menu
    try {
      const response = await fetch(API_UPDATE_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ updates }),
      });

      if (response.status === 200) {
        alert("Menu updated successfully");
        // Trigger WebSocket action after a successful API response
        if (ws && ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify({ action: "updateMenu" }));
        }
      } else {
        alert("Failed to update the menu");
      }
    } catch (error) {
      console.error("Error updating menu:", error);
      alert("Error updating menu");
    }
  };

  return (
    <div>
      <h2>Admin Panel</h2>
      <table border="1">
        <thead>
          <tr>
            <th>Food Name</th>
            <th>Type</th>
            <th>Category</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {menu.map((item) => (
            <tr key={item.menuId}>
              <td>{item.foodName}</td>
              <td>{item.type}</td>
              <td>{item.category}</td>
              <td>{item.price}</td>
              <td>
                <input
                  type="number"
                  value={quantities[item.menuId] || ""}
                  onChange={(e) => handleQuantityChange(item.menuId, e.target.value)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={updateMenuQuantities}>Update Menu</button>
    </div>
  );
};

export default AdminPanel;
