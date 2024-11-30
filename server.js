require("dotenv").config();
const express = require("express");
const methodOverride = require("method-override");
const cors = require("cors");
const session = require("express-session");

const articleRouter = require("./routes/articles"); // article router
const categoryRouter = require("./routes/categories"); // category router
const authRouter = require("./routes/auth"); // auth router

const { isAuthenticated } = require("./authentication.middleware"); // authentication middleware

const app = express();
const hostname = "localhost";
const port = process.env.PORT || 3000;

// connect to mongodb database
const connectToMongo = require("./mongodb.connect");
connectToMongo()
  .then(() => console.log("Connected to MongoDB Database!"))
  .catch((error) => console.error(error));

app.set("view engine", "ejs");
app.set("views", "views"); // expose views folder

// session middleware
app.use(
  session({
    secret: "mysecretkey", // replace with a real secret key
    resave: false,
    saveUninitialized: true,

    cookie: {
      secure: false, // set to true if using https
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.use(express.static("public")); // expose public folder
app.use(cors());

// '/' auto redirect to '/categories'
app.get("/", (req, res) => {
  res.redirect("/categories");
});

// render the about.ejs file
app.get("/about", isAuthenticated, (req, res) => {
  res.render("pages/about", {
    title: "About",
    subtitle: "About Page",
    loginSignupEndpoint: "login",
    loginSignupText: "Login",
  });
});

// render the contact.ejs file
app.get("/contact", isAuthenticated, (req, res) => {
  res.render("pages/contact", {
    title: "Contact",
    subtitle: "Contact Page",
    loginSignupEndpoint: "login",
    loginSignupText: "Login",
  });
});

// router
app.use("/categories/all/articles", articleRouter);
app.use("/categories", categoryRouter);
app.use("/auth", authRouter);

// render 404.ejs when page not found
app.use((req, res) => {
  res.status(404).render("error/404", {
    title: "404",
    subtitle: "Error!",
    loginSignupEndpoint: "login",
    loginSignupText: "Login",
  });
});

// listen to localhost on port 3000
app.listen(port, hostname, () => {
  console.log(`Listening on http://${hostname}:${port}`);
});
