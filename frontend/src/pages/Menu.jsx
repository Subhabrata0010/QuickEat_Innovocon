import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { connectWebSocket, disconnectWebSocket } from "../websocket";
import MenuCard from "../components/MenuCard";

const MenuPage = () => {
  const dispatch = useDispatch();
  const menuItems = useSelector((state) => state.menu.menuItems);

  useEffect(() => {
    connectWebSocket();

    return () => {
      disconnectWebSocket();
    };
  }, [dispatch]);

  return (
    <div className="container mx-auto p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Live Menu 📜</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {menuItems.length > 0 ? (
          menuItems.map((item) => <MenuCard key={item.menuId} item={item} />)
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg">
            Loading menu...
          </p>
        )}
      </div>
    </div>
  );
};

export default MenuPage;