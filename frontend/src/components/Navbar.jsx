import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchUser, logout } from "../redux/userSlice";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import logo from "../images/logo.png";
import CartButton from "./CartButton";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status } = useSelector((state) => state.auth);
  const [showTooltip, setShowTooltip] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false); // ✅ Mobile menu toggle

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  const handleLogin = () => {
    window.open("http://localhost:8000/auth/google", "_self");
  };

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/auth/logout", {
        withCredentials: true,
      });
      dispatch(logout());
      navigate("/");
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <img src={logo} alt="Logo" className="w-12 h-auto" />
          <span className="ml-2 text-2xl font-bold text-blue-600">
            QuickEat
          </span>
        </Link>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-md text-gray-700 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          )}
        </button>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-500">
            Home
          </Link>
          <Link to="/wallet" className="text-gray-700 hover:text-blue-500">
            Wallet
          </Link>
          <Link to="/menu" className="text-gray-700 hover:text-blue-500">
            Menu
          </Link>
          <Link to="/group" className="text-gray-700 hover:text-blue-500">
            Groups
          </Link>
          <Link to="/cart">
            <CartButton />
          </Link>
        </div>

        {/* Profile / Auth Buttons (Desktop) */}
        <div className="hidden md:flex items-center space-x-4 relative">
          {status === "loading" ? (
            <p>Loading...</p>
          ) : user ? (
            <div className="relative">
              {/* Profile Image (Clickable) */}
              <img
                src={user.avatar || "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-10 h-10 rounded-full border object-cover cursor-pointer"
                onClick={() => setShowTooltip(!showTooltip)}
              />

              {/* Tooltip (Appears on Click) */}
              {showTooltip && (
                <div
                  className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-3 border border-gray-300 z-10"
                  onMouseLeave={() => setShowTooltip(false)}
                >
                  <p className="text-gray-800 font-semibold">{user.name}</p>
                  <p className="text-gray-600 text-sm">{user.email}</p>
                  <hr className="my-2" />
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 text-white py-1 rounded-lg hover:bg-red-600 transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>

      {/* Mobile Menu (Shown When Toggled) */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t mt-3 p-4 space-y-4">
          <Link
            to="/"
            className="block text-gray-700 hover:text-blue-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/wallet"
            className="block text-gray-700 hover:text-blue-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Wallet
          </Link>
          <Link
            to="/menu"
            className="block text-gray-700 hover:text-blue-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Menu
          </Link>
          <Link
            to="/group"
            className="block text-gray-700 hover:text-blue-500"
            onClick={() => setIsMenuOpen(false)}
          >
            Groups
          </Link>
          <Link
            to="/cart"
            className="block"
            onClick={() => setIsMenuOpen(false)}
          >
            <CartButton />
          </Link>

          {/* Profile / Auth Buttons (Mobile) */}
          {user ? (
            <div className="text-center">
              <img
                src={user.avatar || "https://via.placeholder.com/40"}
                alt="Profile"
                className="w-12 h-12 mx-auto rounded-full border object-cover my-2"
              />
              <p className="text-gray-800 font-semibold">{user.name}</p>
              <p className="text-gray-600 text-sm">{user.email}</p>
              <button
                onClick={handleLogout}
                className="w-full mt-2 bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition"
              >
                Logout
              </button>
            </div>
          ) : (
            <button
              onClick={handleLogin}
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Login
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
