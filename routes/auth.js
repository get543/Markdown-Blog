// routes/auth.js
const express = require("express");
const router = express.Router();
const User = require("../models/user");

// router login
router.get("/login", (req, res) => {
  res.render("auth/login", {
    title: "Login",
    subtitle: "Log In to Your Account",
    loginSignupButton: "Login",
    loginSignupEndpoint: "signup",
    loginSignupText: "Sign Up",
  });
});

// router signup
router.get("/signup", (req, res) => {
  res.render("auth/signup", {
    title: "Sign Up",
    loginSignupButton: "Sign Up",
    subtitle: "Create an Account",
    loginSignupEndpoint: "login",
    loginSignupText: "Login",
  });
});

// router logout
router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
      res.status(500).json({ message: "Could not log out" });
      return;
    }
    // Clear session cookie
    res.clearCookie("connect.sid"); // Default session cookie name
    res.redirect("/auth/login");
  });
});

// -------------------------------------------------------------

// post method (signup button clicked)
router.post("/signup", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({
      $or: [{ username }],
    });

    // Validation
    if (!username || !password) {
      return res.render("/auth/signup", {
        title: "Sign Up",
        loginSignupButton: "Sign Up",
        subtitle: "Create an Account",
        error: "All fields are required.",
        loginSignupEndpoint: "login",
        loginSignupText: "Login",
      });
    }

    if (existingUser) {
      return res.render("auth/signup", {
        error: "Username already exists",
        title: "Sign Up",
        subtitle: "Create an Account",
        loginSignupButton: "Sign Up",
        loginSignupEndpoint: "login",
        loginSignupText: "Login",
      });
    }

    // Create new user
    const newUser = new User({
      username,
      password,
    });

    await newUser.save();

    // Redirect to login or create a session
    res.redirect("/auth/login");
  } catch (error) {
    console.error(error);
    res.render("auth/signup", {
      error: "Sign Up failed",
      title: "Sign Up",
      subtitle: "Create an Account",
      loginSignupButton: "Sign Up",
      loginSignupEndpoint: "login",
      loginSignupText: "Login",
    });
  }
});

// post method (login button clicked)
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    // Find user by username
    const user = await User.findOne({ username });

    if (!user) {
      return res.render("auth/login", {
        error: "Invalid username or password",
        title: "Login",
        subtitle: "Log In to Your Account",
        loginSignupButton: "Login",
        loginSignupEndpoint: "signup",
        loginSignupText: "Sign Up",
      });
    }

    // Compare passwords
    const isMatch = await user.comparePassword(password);

    if (!isMatch) {
      return res.render("auth/login", {
        error: "Invalid username or password",
        title: "Login",
        subtitle: "Log In to Your Account",
        loginSignupButton: "Login",
        loginSignupEndpoint: "signup",
        loginSignupText: "Sign Up",
      });
    }

    // Set up session or JWT
    req.session.userId = user._id;

    res.redirect("/categories/all");
  } catch (error) {
    console.error(error);
    res.render("auth/login", {
      error: "Login failed",
      title: "Login",
      subtitle: "Log In to Your Account",
      loginSignupButton: "Login",
      loginSignupEndpoint: "signup",
      loginSignupText: "Sign Up",
    });
  }
});

module.exports = router;
