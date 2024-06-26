const express = require("express");
const Article = require("../models/article");
const router = express.Router();

// router new
router.get("/new", (req, res) => {
  res.render("articles/admin/new", {
    article: new Article(),
    title: "New Article",
    subtitle: "New Article",
  });
});

// router edit
router.get("/edit/:id", async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/admin/edit", {
    article: article,
    title: "Edit Article",
    subtitle: "Edit Article",
  });
});

// router show articles
router.get("/:slug", async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");

  res.render("articles/show", {
    article: article,
    title: "View Article",
    subtitle: "Reading..",
  });
});

// post method (create new)
router.post(
  "/",
  async (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect("new")
);

// put method (edit)
router.put(
  "/:id",
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit")
);

// delete method (delete)
router.delete("/:id", async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;

    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;

    try {
      article = await article.save();
      res.redirect(`/articles/${article.slug}`);
    } catch (error) {
      console.error(error);

      res.render(`articles/admin/${path}`, {
        article: article,
        title: "Edit Article",
        subtitle: "Edit Article",
      });
    }
  };
}

module.exports = router;
