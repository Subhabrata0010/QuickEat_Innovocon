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
          <img src={logo} alt="Logo" className="w-16 h-auto" />
          <span className="ml-2 text-2xl font-bold text-blue-600">
            QuickEat
          </span>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-6">
          <Link to="/" className="text-gray-700 hover:text-blue-500">
            Home
          </Link>
          <Link to="/wallet" className="text-gray-700 hover:text-blue-500">
            Wallet
          </Link>
          <Link to="/menu" className="text-gray-700 hover:text-blue-500">
            Menu
          </Link>
          <Link to="/cart">
            <CartButton />
          </Link>
        </div>

        {/* Profile / Auth Buttons */}
        <div className="flex items-center space-x-4 relative">
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
                  className="absolute right-0 mt-2 w-56 bg-white shadow-lg rounded-lg p-3 border border-gray-300"
                  onMouseLeave={() => setShowTooltip(false)} // Hide when mouse leaves
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
            /* Login Button */
            <button
              onClick={handleLogin}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition"
            >
              Login
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
