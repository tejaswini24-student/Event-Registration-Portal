import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Auth.css";

export default function Login() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const login = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "https://eventhub-backend-tt0w.onrender.com/api/auth/login",
        form
      );

      if (res.data.success) {

        localStorage.setItem(
          "user",
          JSON.stringify(res.data.user)
        );

        toast.success("Login Successful 🚀");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);

      } else {
        toast.error(res.data.message);
      }

    } catch {
      toast.error("Server error ❌");
    }
  };

  return (
    <div className="auth-page">

      <div className="auth-card">

        <h2 className="auth-title">Welcome Back 👋</h2>

        <form onSubmit={login}>

          <input
            className="auth-input"
            type="email"
            placeholder="Email"
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
          />

          <input
            className="auth-input"
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
          />

          <button className="auth-btn">
            Login
          </button>

        </form>

        <div className="auth-link">
          Don’t have an account? <Link to="/signup">Sign up</Link>
        </div>

      </div>

    </div>
  );
}