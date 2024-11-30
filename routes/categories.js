const express = require("express");
const Article = require("../models/article");
const { isAuthenticated } = require("../authentication.middleware");
const router = express.Router();

// from '/' redirect to '/categories'
// Since it's mounted at "/categories", use "/" as the base route
router.get("/", isAuthenticated, (req, res) => {
  res.render("articles/categories", {
    user: req.user,
    title: "Categories",
    subtitle: "Blog Categories",
    loginSignupEndpoint: "login",
    loginSignupText: "Login",
  });
});

// --------------- use relative path ---------------
// random category, loads all blog articles (index.ejs)
router.get("/all", isAuthenticated, async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });

  res.render("articles/index", {
    articles: articles,
    title: "All Articles",
    subtitle: "Blog Articles",
    loginSignupEndpoint: "login",
    loginSignupText: "Login",
  });
});

// load specific database called full-markdown-test (title)
router.get("/mdtest", isAuthenticated, (req, res) => {
  res.redirect("/categories/all/articles/full-markdown-test");
});

router.use(isAuthenticated);

module.exports = router;
