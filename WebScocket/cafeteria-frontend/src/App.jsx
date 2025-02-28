import { Routes, Route, Link } from "react-router-dom";
import Menu from "./components/Menu";
import AdminPanel from "./AdminPanel";

function App() {
  return (
    <div className="p-4">
      <nav>
        <Link to="/" className="mr-4">🏠 Home</Link>
        <Link to="/menu" className="mr-4">🍽 Menu</Link>
      </nav>

      <Routes>
        <Route path="/menu" element={<Menu />} />
        <Route path="/AdminPanel" element={<AdminPanel/>} />
        <Route path="/" element={<h1 className="text-2xl">🏠 Welcome to the Cafeteria</h1>} />
      </Routes>
    </div>
  );
}

export default App;
