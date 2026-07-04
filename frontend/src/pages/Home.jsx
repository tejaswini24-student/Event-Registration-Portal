import { Link } from "react-router-dom";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <div className="hero">

        <h1>
          EventHub — Smarter Campus Events
        </h1>

        <p>
          Discover, register, and participate in college events,
          hackathons, workshops, cultural nights and more —
          all in one modern platform.
        </p>

        <div className="buttons">

          <Link to="/events" className="primary-btn">
            Explore Events
          </Link>

          <Link to="/signup" className="secondary-btn">
            Get Started
          </Link>

        </div>

        <div className="stats">

          <div className="stat-card">
            <h2>50+</h2>
            <p>Events</p>
          </div>

          <div className="stat-card">
            <h2>1K+</h2>
            <p>Students</p>
          </div>

          <div className="stat-card">
            <h2>10+</h2>
            <p>Departments</p>
          </div>

        </div>

      </div>
    </div>
  );
}