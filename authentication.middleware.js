const User = require("./models/user");

function requireAuth(req, res, next) {
  if (!req.session.userId) {
    return res.status(401).render("error/401", {
      title: "401",
      subtitle: "Error!",
      loginSignupEndpoint: "login",
      loginSignupText: "Login",
    });
  }
  next();
}

function isAuthenticated(req, res, next) {
  // Check if user is logged in via session
  if (req.session && req.session.userId) {
    // Optional: Verify user still exists in database
    User.findById(req.session.userId)
      .then((user) => {
        if (user) {
          req.user = user; // Attach user to request
          res.locals.isLoggedIn = true;
          res.locals.user = user;
          return next();
        }
        // If user not found, clear session
        req.session.destroy();
        return res.redirect("/auth/login");
      })
      .catch((err) => {
        console.error("Authentication error:", err);
        return res.status(500).send("Authentication error");
      });
  } else {
    res.locals.isLoggedIn = false;
    res.locals.user = null;
    next();
  }
}

module.exports = {
  requireAuth,
  isAuthenticated,
};
