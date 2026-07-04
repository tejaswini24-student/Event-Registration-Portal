import { useLocation } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export default function Register() {

  const location = useLocation();
  const eventName = location.state?.event || "";

  const [form, setForm] = useState({
    name: "",
    event: eventName
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios.post("http://localhost:5000/api/register", form);

    alert("Registered Successfully!");
  };

  return (
    <div style={{ padding: 20, textAlign: "center" }}>
      <h2>📝 Event Registration</h2>

      <form onSubmit={handleSubmit}>

        <input
          placeholder="Your Name"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <br /><br />

        <input
          value={form.event}
          readOnly
        />

        <br /><br />

        <button>Register</button>
      </form>
    </div>
  );
}