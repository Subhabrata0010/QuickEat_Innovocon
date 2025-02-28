import React, { useState, useEffect } from "react";
import axios from "axios";

const API_WALLET_URL = "https://u07kqwjf72.execute-api.ap-south-1.amazonaws.com/prod/wallet";

const Wallet = () => {
  const userEmail = "student@example.com"; // Replace with actual logged-in user's email
  const [balance, setBalance] = useState(0);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

 

  // ✅ Fetch wallet balance from API
  const fetchWalletBalance = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_WALLET_URL}/${userEmail}`);
      setBalance(response.data.balance);
      console.log(response);
      
    } catch (error) {
      console.error("❌ Error fetching wallet balance:", error);
      setError("Failed to load wallet balance.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchWalletBalance();
  }, []);

  // ✅ Deposit funds into the wallet
  const handleDeposit = async () => {
    const parsedAmount = parseFloat(amount);
    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      alert("Enter a valid deposit amount.");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${API_WALLET_URL}/deposit`,
        { email: userEmail, money: parsedAmount },
        { headers: { "Content-Type": "application/json" } }
      );

      setBalance(response.data.balance); // Update balance
      setAmount(""); // Clear input
      alert("✅ Deposit successful!");
    } catch (error) {
      console.error("❌ Error depositing funds:", error);
      alert("❌ Failed to deposit money.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold text-blue-600 mb-6">💳 Wallet</h2>

      {/* Wallet Balance Card */}
      <div className="w-full max-w-md bg-white shadow-xl rounded-lg p-6 text-center">
        <h3 className="text-lg font-semibold text-gray-700">Available Balance</h3>
        {loading ? (
          <p className="text-xl font-bold text-gray-500 mt-2">Loading...</p>
        ) : (
          <p className="text-4xl font-bold text-green-600 mt-2">₹{balance.toFixed(2)}</p>
        )}
      </div>

      {/* Add Funds Input */}
      <div className="mt-4 flex space-x-2">
        <input
          type="number"
          className="w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-blue-500"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button
          onClick={handleDeposit}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          disabled={loading}
        >
          {loading ? "Processing..." : "➕ Add Funds"}
        </button>
      </div>

      {/* Error Message */}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default Wallet;
