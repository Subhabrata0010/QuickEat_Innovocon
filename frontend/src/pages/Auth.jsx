import React from "react";
import { FcGoogle } from "react-icons/fc";

const Auth = () => {
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:8000/auth/google";
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-2xl shadow-lg text-center w-80 sm:w-96">
        <h2 className="text-2xl font-bold text-gray-700 mb-4">Welcome</h2>
        <p className="text-gray-500 mb-6">Sign in with Google to continue</p>

        <button
          onClick={handleGoogleLogin}
          className="flex items-center justify-center gap-3 w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition"
        >
          <FcGoogle />
          Sign in with Google
        </button>
      </div>
    </div>
  );
};

export default Auth;
