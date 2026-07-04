import { useEffect, useState } from "react";
import axios from "axios";
import "./Events.css";
import { toast } from "react-toastify";
import { FaCalendarAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";

export default function Events() {

  const [events, setEvents] = useState([]);
  const [registered, setRegistered] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");

  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {

    fetchEvents();
    fetchRegistrations();

  }, []);

  const fetchEvents = async () => {

    const res = await axios.get(
      "http://localhost:5000/api/events"
    );

    setEvents(res.data);

  };

  const fetchRegistrations = async () => {

    if (!user) return;

    const res = await axios.get(
      "http://localhost:5000/api/register"
    );

    const myRegistrations = res.data
      .filter((item) => item.email === user.email)
      .map((item) => item.event);

    setRegistered(myRegistrations);

  };

  const registerEvent = async (event) => {

    if (!user) {

      toast.error("Please login first.");

      return;

    }

    try {

      await axios.post(
        "http://localhost:5000/api/register",
        {
          name: user.name,
          email: user.email,
          event: event.name
        }
      );

      toast.success("Event registered successfully 🎉");

      setRegistered([...registered, event.name]);

    }

    catch {

      toast.error("Already registered or failed ❌");

    }

  };

  const filteredEvents = events.filter((event) => {

    const matchSearch =
      event.name.toLowerCase().includes(search.toLowerCase()) ||

      event.location.toLowerCase().includes(search.toLowerCase());

    const matchCategory =
      category === "All" ||

      event.category === category;

    return matchSearch && matchCategory;

  });

  return (

    <div className="events-page">

      <section className="events-hero">

        <h1>Explore Events</h1>

        <p>

          Discover hackathons, workshops,
          cultural festivals and competitions
          happening across your campus.

        </p>

      </section>

      <section className="search-section">

        <input

          className="search-input"

          placeholder="Search events..."

          value={search}

          onChange={(e) =>
            setSearch(e.target.value)
          }

        />

      </section>

      <section className="filter-section">

        {[
          "All",
          "Technical",
          "Workshop",
          "Cultural",
          "Sports"
        ].map((item) => (

          <button

            key={item}

            className={
              category === item
                ? "active"
                : ""
            }

            onClick={() =>
              setCategory(item)
            }

          >

            {item}

          </button>

        ))}

      </section>

      <section className="events-grid">

        {filteredEvents.map((event) => (

          <div
            className="event-card"
            key={event._id}
          >

            <img

              src={event.image}

              alt={event.name}

              className="event-image"

            />

            <div className="event-content">

              <div className="top-row">

                <span className="badge">

                  {event.category}

                </span>

                <div className="seat-box">

                  <span className="seat">

                    {event.seats} Seats Left

                  </span>

                  <div className="seat-progress">

                    <div
                      className="seat-fill"
                      style={{
                        width: `${Math.min(event.seats / 3, 100)}%`
                      }}
                    ></div>

                  </div>

                </div>

              </div>

              <h2>{event.name}</h2>

              <p className="description">

                {event.description}

              </p>

              <p className="event-info">
                <FaCalendarAlt className="icon" /> {event.date}
              </p>

              <p className="event-info">
                <FaMapMarkerAlt className="icon" /> {event.location}
              </p>

              {

                registered.includes(event.name)

                ?

                <button className="registered">

                  Registered ✔

                </button>

                :

                <button

                  className="register-btn"

                  onClick={() =>
                    registerEvent(event)
                  }

                >

                  Register Now

                </button>

              }

            </div>

          </div>

        ))}

      </section>

    </div>

  );

}