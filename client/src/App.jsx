
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";

export default function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/about" element={<About />} />
        <Route
          path="*"
          element={
            <div className="container py-5">
              <h2>404 - Page Not Found</h2>
              <p>The requested page does not exist.</p>
            </div>
          }
        />
      </Routes>
    </>
  );
}
