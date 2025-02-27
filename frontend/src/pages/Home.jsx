import React from "react";
import { useNavigate } from "react-router-dom";
import { FaUtensils, FaClock, FaShieldAlt } from "react-icons/fa";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 text-center">
        <h1 className="text-5xl font-extrabold animate-fade-in">
          Welcome to QuickEat 🍽️
        </h1>
        <p className="text-lg mt-3 opacity-90">
          Order food effortlessly and skip the wait.
        </p>
        <button
          onClick={() => navigate("/menu")}
          className="mt-6 px-8 py-3 text-lg font-semibold bg-white text-blue-600 rounded-full shadow-lg hover:scale-105 hover:bg-gray-100 transition-transform"
        >
          View Menu 🍕
        </button>
      </section>

      {/* Features Section */}
      <section className="container mx-auto py-16 px-6">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          Why Choose QuickEat?
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          <div className="bg-white p-8 shadow-xl rounded-lg text-center hover:scale-105 transition-transform">
            <FaUtensils className="text-blue-500 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold">Fast Ordering</h3>
            <p className="text-gray-600 mt-2">
              Place orders in seconds, skip long queues.
            </p>
          </div>
          <div className="bg-white p-8 shadow-xl rounded-lg text-center hover:scale-105 transition-transform">
            <FaClock className="text-purple-500 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold">Live Order Tracking</h3>
            <p className="text-gray-600 mt-2">
              Get real-time updates on your order status.
            </p>
          </div>
          <div className="bg-white p-8 shadow-xl rounded-lg text-center hover:scale-105 transition-transform">
            <FaShieldAlt className="text-green-500 text-5xl mx-auto mb-4" />
            <h3 className="text-2xl font-bold">Secure Payments</h3>
            <p className="text-gray-600 mt-2">
              Multiple payment options with top security.
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-gray-100 py-16">
        <h2 className="text-4xl font-bold text-center mb-12 text-gray-800">
          How It Works?
        </h2>
        <div className="container mx-auto flex flex-wrap justify-center gap-8">
          <div className="bg-white p-6 shadow-md rounded-lg text-center w-64 hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold">📜 Browse Menu</h3>
            <p className="text-gray-600 mt-2">
              Explore a variety of delicious meals.
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg text-center w-64 hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold">🛍️ Place Order</h3>
            <p className="text-gray-600 mt-2">
              Select your items and confirm your order.
            </p>
          </div>
          <div className="bg-white p-6 shadow-md rounded-lg text-center w-64 hover:scale-105 transition-transform">
            <h3 className="text-xl font-semibold">📦 Pickup & Enjoy</h3>
            <p className="text-gray-600 mt-2">
              Collect your order hassle-free.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
