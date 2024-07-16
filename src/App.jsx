import Auth from "./pages/Auth";
import "./App.css";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Update from "./pages/Update";
import Create from "./pages/Create";

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/" className="p-4 text-4xl font-semibold">
          Movies
        </Link>
        <div className="p-4 space-x-8">
          <Link className="px-4 py-2 bg-blue-400 rounded-xl " to="/login">
            Sign Up
          </Link>
          <Link className="px-4 py-2 bg-blue-400 rounded-xl" to="/create">
            Create
          </Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />
        <Route path="/create" element={<Create />} />
        <Route path="/:id" element={<Update />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
