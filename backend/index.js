const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();
const authRoutes = require("./routes/authRoutes");

const app = express();

app.use(cors());
app.use(express.json());

/* MONGODB CONNECTION (ADD HERE) */
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

/* ROUTES (ADD BELOW CONNECTION) */
const eventRoutes = require("./routes/eventRoutes");
const registrationRoutes = require("./routes/registrationRoutes");

app.use("/api/events", eventRoutes);
app.use("/api/register", registrationRoutes);
app.use("/api/auth", authRoutes);

app.get("/api/seed-events", async (req, res) => {
  const Event = require("./models/Event");

  await Event.deleteMany({});

  await Event.insertMany([
    {
      name: "TechFest 2026",
      description:
        "Annual technology festival featuring hackathons, coding contests and industry talks.",
      category: "Technical",
      date: "15/09/2026 10:00 AM",
      location: "Main Auditorium",
      seats: 300,
      image:
        "https://images.unsplash.com/photo-1540575467063-178a50c2df87"
    },

    {
      name: "AI & ML Workshop",
      description:
        "Hands-on workshop on Artificial Intelligence and Machine Learning using Python.",
      category: "Workshop",
      date: "30/08/2026 02:00 PM",
      location: "Computer Lab 3",
      seats: 60,
      image:
        "https://images.unsplash.com/photo-1589254065878-42c9da997008"
    },

    {
      name: "Inter-College Hackathon",
      description:
        "24-hour hackathon with prizes, mentors and startup opportunities.",
      category: "Technical",
      date: "05/10/2026 09:00 AM",
      location: "Innovation Lab",
      seats: 120,
      image:
        "https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
    },

    {
      name: "Cultural Night",
      description:
        "Music, dance and theatre performances from students across departments.",
      category: "Cultural",
      date: "22/08/2026 06:30 PM",
      location: "Open Air Theatre",
      seats: 500,
      image:
        "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f"
    },

    {
      name: "Entrepreneurship Summit",
      description:
        "Meet founders, investors and startup mentors from across India.",
      category: "Workshop",
      date: "28/09/2026 11:00 AM",
      location: "Seminar Hall B",
      seats: 200,
      image:
        "https://images.unsplash.com/photo-1552664730-d307ca884978"
    },

    {
      name: "Annual Sports Meet",
      description:
        "Track, field and team sports competitions open to all departments.",
      category: "Sports",
      date: "12/11/2026 07:30 AM",
      location: "College Sports Ground",
      seats: 400,
      image:
        "https://images.unsplash.com/photo-1461896836934-ffe607ba8211"
    }
  ]);

  res.send("Professional demo events added ✅");
});

/* TEST ROUTE */
app.get("/", (req, res) => {
  res.send("EventHub Backend is Running 🚀");
});

/* SERVER START */
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});