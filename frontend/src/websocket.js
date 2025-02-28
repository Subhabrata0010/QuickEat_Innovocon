import { setMenu } from "./redux/menuSlice";
import store from "./redux/store"; // Import Redux store

const WEBSOCKET_URL =
  "wss://n8x16n9r8c.execute-api.ap-south-1.amazonaws.com/dev/";

let socket;
const listeners = [];

export const connectWebSocket = () => {
  if (socket && socket.readyState === WebSocket.OPEN) return;

  socket = new WebSocket(WEBSOCKET_URL);

  socket.onopen = () => {
    console.log("✅ WebSocket Connected");
    sendWebSocketMessage({ action: "updateMenu" });
  };

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data);
    console.log("📩 Received:", data);

    if (data.action === "menuUpdate") {
      // Dispatch menu update to Redux
      store.dispatch(setMenu(data.menu || []));
    }

    listeners.forEach((listener) => listener(data));
  };

  socket.onclose = () => console.log("❌ WebSocket Disconnected");
  socket.onerror = (error) => console.error("⚠️ WebSocket Error:", error);
};

export const disconnectWebSocket = () => {
  if (socket) {
    socket.close();
    socket = null;
  }
};

export const sendWebSocketMessage = (message) => {
  if (socket && socket.readyState === WebSocket.OPEN) {
    socket.send(JSON.stringify(message));
  }
};

export const subscribeToMessages = (callback) => {
  listeners.push(callback);
};
