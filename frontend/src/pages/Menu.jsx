import React, { useState } from "react";
import { useSelector } from "react-redux";
import MenuCard from "../components/MenuCard";

const MenuPage = () => {
  const menuItems = useSelector((state) => state.menu.menuItems);
  const [filter, setFilter] = useState("Veg"); // Default to Veg items

  const filteredItems = menuItems.filter((item) => item.type === filter);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-gray-100 py-10">
      <h1 className="text-4xl font-extrabold text-center text-gray-800 mb-8 drop-shadow-lg">
        Our Delicious Menu 🍽️
      </h1>

      {/* Toggle Buttons */}
      <div className="flex justify-center mb-8">
        <button
          className={`px-6 py-3 mx-2 rounded-full text-lg font-semibold shadow-md transition-all duration-300 ${
            filter === "Veg"
              ? "bg-green-500 text-white scale-105"
              : "bg-gray-300 text-gray-700 hover:bg-green-400"
          }`}
          onClick={() => setFilter("Veg")}
        >
          🥗 Veg
        </button>
        <button
          className={`px-6 py-3 mx-2 rounded-full text-lg font-semibold shadow-md transition-all duration-300 ${
            filter === "Non-Veg"
              ? "bg-red-500 text-white scale-105"
              : "bg-gray-300 text-gray-700 hover:bg-red-400"
          }`}
          onClick={() => setFilter("Non-Veg")}
        >
          🍗 Non-Veg
        </button>
      </div>

      {/* Menu Items */}
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 px-6">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <MenuCard key={item.id} item={item} />)
        ) : (
          <p className="text-center col-span-full text-gray-500 text-lg">
            No items available.
          </p>
        )}
      </div>
    </div>
  );
};

export default MenuPage;
