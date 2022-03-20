const express = require("express"),
  morgan = require("morgan"),
  mongoose = require("mongoose"),
  cookieParser = require("cookie-parser"),
  app = express(),
  { requireAuth, checkUser } = require("./middlewares/authMiddleware");

// Routes
const adminRoutes = require("./routes/adminRoutes"),
  blogRoutes = require("./routes/blogRoutes"),
  authRoutes = require("./routes/authRoutes"),
  indexRoutes = require("./routes/indexRoutes");

// Configuration
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("tiny"));
app.use(cookieParser());

// DB Configuration
const dbURL =
  "mongodb+srv://USERNAME:PASSWORD@blogdeneme.t6eyv.mongodb.net/blogdeneme?retryWrites=true&w=majority";
mongoose
  .connect(dbURL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));

app.get("*", checkUser);

// Routes using
app.use(indexRoutes);
app.use("/", authRoutes);
app.use("/blog", blogRoutes);
app.use("/admin", requireAuth, adminRoutes);

app.get("/about", (req, res) => {
  res.render("index", {
    title: "Hakkımızda",
    route: "./about/about_content",
  });
});

app.get("/about-us", (req, res) => {
  res.redirect("/about");
});

app.use((req, res) => {
  res.status(404).render("./inc/404", { title: "Sayfa Bulunamadı" });
});
