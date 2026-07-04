const express = require("express");
const router = express.Router();

const User = require("../models/User");

// SIGNUP
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.json({
        success: false,
        message: "All fields are required"
      });
    }

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.json({
        success: false,
        message: "Enter a valid email"
      });
    }

    if (password.length < 6) {
      return res.json({
        success: false,
        message:
          "Password must be at least 6 characters"
      });
    }

    const userExists =
      await User.findOne({ email });

    if (userExists) {
      return res.json({
        success: false,
        message:
          "Account already exists. Please login."
      });
    }

    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    res.json({
      success: true,
      message:
        "Account created successfully"
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

// LOGIN
router.post("/login", async (req, res) => {
  try {

    const { email, password } =
      req.body;

    const user =
      await User.findOne({ email });

    if (!user) {
      return res.json({
        success: false,
        message:
          "Account not found. Please signup."
      });
    }

    if (user.password !== password) {
      return res.json({
        success: false,
        message:
          "Incorrect password"
      });
    }

    res.json({
      success: true,
      message:
        "Login successful",
      user
    });

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error"
    });
  }
});

module.exports = router;