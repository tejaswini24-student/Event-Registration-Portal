import "./About.css";

export default function About() {
  return (
    <div className="about-container">

      <div className="about-hero">
        <h1>About EventHub</h1>
        <p>
          A modern digital platform designed to simplify college event registrations
          and eliminate long queues.
        </p>
      </div>

      <div className="about-grid">

        <div className="about-card">
          <h2>🎯 Our Mission</h2>
          <p>
            To help students easily discover and register for college events like
            hackathons, workshops, cultural fests, and technical competitions.
          </p>
        </div>

        <div className="about-card">
          <h2>⚡ Why EventHub?</h2>
          <p>
            Traditional registration systems are slow and manual. EventHub makes
            everything instant, digital, and accessible from anywhere.
          </p>
        </div>

        <div className="about-card">
          <h2>🛠 Tech Stack</h2>
          <p>
            React (Vite), Node.js, Express.js, MongoDB, Axios, JWT-ready structure.
          </p>
        </div>

        <div className="about-card">
          <h2>🚀 Vision</h2>
          <p>
            To become a complete campus event management system used by colleges
            across India.
          </p>
        </div>

      </div>

      <div className="about-footer">
        <p>Built with ❤️ for students</p>
      </div>

    </div>
  );
}