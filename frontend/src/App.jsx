import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MenuPage from "./pages/Menu";
import CartPage from "./pages/CartPage";
import Home from "./pages/Home";
import Footer from "./components/Footer";
import Groups from "./pages/Groups";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/signup"
          element={<h1 className="text-center mt-10">Sign Up Page</h1>}
        />
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/group" element={<Groups/>} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
