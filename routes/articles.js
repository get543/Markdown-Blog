const express = require("express");
const Article = require("../models/article");
const { isAuthenticated, requireAuth } = require("../authentication.middleware");
const router = express.Router();

// router new
router.get("/new", requireAuth, isAuthenticated, (req, res) => {
  res.render("articles/admin/new", {
    article: new Article(),
    title: "New Article",
    subtitle: "New Article",
    loginSignupEndpoint: "login",
    loginSignupText: "Login",
  });
});

// router edit
router.get("/edit/:id", requireAuth, isAuthenticated, async (req, res) => {
  const article = await Article.findById(req.params.id);
  res.render("articles/admin/edit", {
    article: article,
    title: "Edit Article",
    subtitle: "Edit Article",
    loginSignupEndpoint: "login",
    loginSignupText: "Login",
  });
});

// router show articles
router.get("/:slug", isAuthenticated, async (req, res) => {
  const article = await Article.findOne({ slug: req.params.slug });
  if (article == null) res.redirect("/");

  res.render("articles/show", {
    article: article,
    title: "View Article",
    subtitle: "Reading..",
    loginSignupEndpoint: "login",
    loginSignupText: "Login",
  });
});

// post method (create new)
router.post(
  "/",
  requireAuth,
  isAuthenticated,
  async (req, res, next) => {
    req.article = new Article();
    next();
  },
  saveArticleAndRedirect("new")
);

// put method (edit)
router.put(
  "/:id",
  requireAuth,
  isAuthenticated,
  async (req, res, next) => {
    req.article = await Article.findById(req.params.id);
    next();
  },
  saveArticleAndRedirect("edit")
);

// delete method (delete)
router.delete("/:id", requireAuth, async (req, res) => {
  await Article.findByIdAndDelete(req.params.id);
  res.redirect("/");
});

router.use(isAuthenticated);

function saveArticleAndRedirect(path) {
  return async (req, res) => {
    let article = req.article;

    article.title = req.body.title;
    article.description = req.body.description;
    article.markdown = req.body.markdown;

    try {
      article = await article.save();
      res.redirect(`/categories/all/articles/${article.slug}`);
    } catch (error) {
      console.error(error);

      res.render(`articles/admin/${path}`, {
        article: article,
        title: "Edit Article",
        subtitle: "Edit Article",
        loginSignupEndpoint: "login",
        loginSignupText: "Login",
      });
    }
  };
}

module.exports = router;
