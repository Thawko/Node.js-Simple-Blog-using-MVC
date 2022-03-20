const Blog = require("../models/blogs");

const admin_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", {
        title: "Admin",
        blogs: result,
        route: "./admin/admin_content",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const admin_add = (req, res) => {
  res.render("index", { title: "Yeni yazı", route: "./admin/add" });
};

const admin_add_post = function (req, res) {
  const blog = new Blog(req.body);
  blog
    .save()
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
};

const admin_delete = function (req, res) {
  const id = req.params.id;
  Blog.findByIdAndDelete(id)
    .then((result) => {
      res.json({ link: "/admin" });
    })
    .catch((err) => {
      console.log(err);
    });
};

const admin_edit = function (req, res) {
  const id = req.params.id;
  Blog.findById(id)
    .then((result) => {
      res.render("index", {
        title: "Düzenleme sayfası",
        blog: result,
        route: "./admin/edit",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const admin_edit_post = function (req, res) {
  Blog.findByIdAndUpdate(req.params.id, req.body)
    .then((result) => {
      res.redirect("/admin");
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = {
  admin_index,
  admin_add,
  admin_add_post,
  admin_delete,
  admin_edit,
  admin_edit_post,
};
