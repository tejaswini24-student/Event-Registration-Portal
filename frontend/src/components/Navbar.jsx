import { Link, useNavigate } from "react-router-dom";
import { FiSun, FiMoon, FiUser } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";
import "./Navbar.css";

export default function Navbar() {

  const navigate = useNavigate();

  const { theme, toggleTheme } = useTheme();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">

      <Link to="/" className="logo">
        EventHub
      </Link>

      <div className="nav-links">

        <Link to="/" className="nav-link">
          Home
        </Link>

        <Link to="/events" className="nav-link">
          Events
        </Link>

        {user && (
          <Link to="/dashboard" className="nav-link">
            Dashboard
          </Link>
        )}

        <Link to="/about" className="nav-link">
          About
        </Link>

      </div>

      <div className="right-section">

        <button
          className="theme-btn"
          onClick={toggleTheme}
        >
          {theme === "light"
            ? <FiMoon size={20} />
            : <FiSun size={20} />}
        </button>

        {user ? (
          <>
            <div className="user-box">
              <FiUser />
              <span>{user.name}</span>
            </div>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              className="login-btn"
              to="/login"
            >
              Login
            </Link>

            <Link
              className="signup-btn"
              to="/signup"
            >
              Register
            </Link>
          </>
        )}

      </div>

    </nav>
  );
}