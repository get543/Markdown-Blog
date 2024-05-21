const express = require("express");
const Article = require("../models/article");
const router = express.Router();

router.get("/categories", (req, res) => {
  res.render("articles/categories", {
    title: "Categories",
    subtitle: "Blog Categories",
  });
});

router.get("/categories/random", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });

  res.render("articles/index", {
    articles: articles,
    title: "All Articles",
    subtitle: "Blog Articles",
  });
});

router.get("/categories/mdtest", (req, res) => {
  res.redirect("/categories/articles/full-markdown-test");
});

module.exports = router;
