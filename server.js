require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const cors = require("cors");

const articleRouter = require("./routes/articles"); // article router
const categoryRouter = require("./routes/categories"); // category router
const Article = require("./models/article"); // contains database scheme

const app = express();
const hostname = "127.0.0.1";
const port = 3000;

// connect to mongodb database
const connectToMongo = require("./mongodb.connect");
connectToMongo()
  .then(() => console.log("Connected to MongoDB Database!"))
  .catch((error) => console.error(error));

app.set("view engine", "ejs");
app.set("views", "views"); // expose views folder

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(methodOverride("_method"));
app.use(express.static("public")); // expose public folder
app.use(cors());

// auto redirect to /categories when loading site
app.get("/", async (req, res) => {
  res.redirect("/categories");
});

// render the categories.ejs file
app.get("/categories", (req, res) => {
  res.render("articles/categories", {
    title: "Categories",
    subtitle: "Blog Categories",
  });
});

// random category, loads all blog articles (index.ejs)
app.get("/categories/all", async (req, res) => {
  const articles = await Article.find().sort({ createdAt: "desc" });

  res.render("articles/index", {
    articles: articles,
    title: "All Articles",
    subtitle: "Blog Articles",
  });
});

// load specific database called full-markdown-test (title)
app.get("/categories/mdtest", (req, res) => {
  res.redirect("/articles/full-markdown-test");
});

// router
app.use("/articles", articleRouter);
app.use("/categories", categoryRouter);

// render 404.ejs when page not found
app.use((req, res) => {
  res.status(404).render("error/404", { title: "404", subtitle: "!" });
});

// listen to localhost on port 3000
app.listen(port, hostname, () => {
  console.log(`Listening on http://${hostname}:${port}`);
});
