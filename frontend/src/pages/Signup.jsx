import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import "./Auth.css";

export default function Signup() {

  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: ""
  });

  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:5000/api/auth/signup",
        form
      );

      if (res.data.success) {

        toast.success("Account Created 🎉");

        setTimeout(() => {
          navigate("/login");
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

        <h2 className="auth-title">Create Account 🚀</h2>

        <form onSubmit={register}>

          <input
            className="auth-input"
            placeholder="Name"
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />

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
            Sign Up
          </button>

        </form>

        <div className="auth-link">
          Already have an account? <Link to="/login">Login</Link>
        </div>

      </div>

    </div>
  );
}