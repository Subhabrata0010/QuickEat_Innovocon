import React, { useState, useEffect } from "react";
import MenuCard from "../components/MenuCard";

const MenuPage = () => {
  const [menuItems, setMenuItems] = useState([]);

  useEffect(() => {
    // Dummy Data (Replace with API call later)
    const dummyData = [
      { id: 1, name: "Veg Burger", price: 99, quantity: 10 },
      { id: 2, name: "Cheese Pizza", price: 199, quantity: 5 },
      { id: 3, name: "French Fries", price: 79, quantity: 0 }, // Out of Stock
    ];
    setMenuItems(dummyData);
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Menu</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {menuItems.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
};

export default MenuPage;
