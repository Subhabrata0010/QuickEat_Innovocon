import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={<h1 className="text-center mt-10">Welcome to QuickEat</h1>}
        />
        <Route
          path="/signup"
          element={<h1 className="text-center mt-10">Sign Up Page</h1>}
        />
      </Routes>
    </Router>
  );
}

export default App;
