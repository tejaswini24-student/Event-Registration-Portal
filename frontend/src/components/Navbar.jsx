import { NavLink, Link, useNavigate } from "react-router-dom";
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

        <NavLink
          to="/"
          end
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Home
        </NavLink>

        <NavLink
          to="/events"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          Events
        </NavLink>

        {user && (
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              isActive ? "nav-link active" : "nav-link"
            }
          >
            Dashboard
          </NavLink>
        )}

        <NavLink
          to="/about"
          className={({ isActive }) =>
            isActive ? "nav-link active" : "nav-link"
          }
        >
          About
        </NavLink>

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
            <NavLink
              to="/login"
              className="login-btn"
            >
              Login
            </NavLink>

            <NavLink
              to="/signup"
              className="signup-btn"
            >
              Register
            </NavLink>
          </>
        )}

      </div>

    </nav>
  );
}