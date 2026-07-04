const express = require("express");
const router = express.Router();

const Registration = require("../models/Registration");

// REGISTER EVENT
router.post("/", async (req, res) => {
  try {

    const { name, email, event } = req.body;

    if (!name || !email || !event) {
      return res.json({
        success: false,
        message: "All fields are required"
      });
    }

    const existingRegistration =
      await Registration.findOne({
        email,
        event
      });

    if (existingRegistration) {
      return res.json({
        success: false,
        message: "You already registered for this event"
      });
    }

    const registration =
      new Registration({
        name,
        email,
        event
      });

    await registration.save();

    res.json({
      success: true,
      message: "Registration successful"
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

// GET ALL REGISTRATIONS
router.get("/", async (req, res) => {

  try {

    const registrations =
      await Registration.find();

    res.json(registrations);

  } catch (error) {

    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }

});

module.exports = router;