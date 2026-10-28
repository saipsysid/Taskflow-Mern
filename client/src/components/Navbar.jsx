
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand fw-bold" to="/">
          TaskFlow
        </Link>

        <div className="navbar-nav ms-auto flex-row gap-3">
          <NavLink className="nav-link" to="/">
            Dashboard
          </NavLink>

          <NavLink className="nav-link" to="/about">
            About
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
