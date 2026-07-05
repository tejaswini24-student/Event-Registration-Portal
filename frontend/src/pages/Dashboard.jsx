import { useEffect, useState } from "react";
import axios from "axios";
import "./Dashboard.css";

export default function Dashboard() {

  const user = JSON.parse(localStorage.getItem("user"));

  const [registrations, setRegistrations] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const [regRes, eventRes] = await Promise.all([
        axios.get("https://eventhub-backend-tt0w.onrender.com"),
        axios.get("https://eventhub-backend-tt0w.onrender.com")
      ]);

      const myRegs = regRes.data.filter(
        (r) => r.email === user?.email
      );

      setRegistrations(myRegs);
      setEvents(eventRes.data);

    } catch (err) {
      console.log(err);
    }
  };

  const myEventNames = registrations.map(
    (r) => r.event
  );

  const myEvents = events.filter((event) =>
    myEventNames.includes(event.name)
  );

  return (
    <div className="dashboard">

      <div className="dashboard-header">

        <h1>Welcome, {user?.name} 👋</h1>

        <p>
          Here are the events you have registered for.
        </p>

      </div>

      {myEvents.length === 0 ? (
        <p className="empty">
          No events registered yet.
        </p>
      ) : (

        <div className="dashboard-grid">

          {myEvents.map((event) => (

            <div className="dashboard-card" key={event._id}>

              <img
                src={event.image}
                alt={event.name}
                className="card-img"
              />

              <div className="card-content">

                <span className="badge">
                  {event.category}
                </span>

                <h2>{event.name}</h2>

                <p className="desc">
                  {event.description}
                </p>

                <p className="info">
                  📅 {event.date}
                </p>

                <p className="info">
                  📍 {event.location}
                </p>

                <button className="registered">
                  ✔ Registered
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>
  );
}