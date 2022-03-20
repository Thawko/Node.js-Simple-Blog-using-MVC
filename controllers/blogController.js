const Blog = require("../models/blogs");

const blogs_index = (req, res) => {
  Blog.find()
    .sort({ createdAt: -1 })
    .then((result) => {
      res.render("index", {
        title: "Anasayfa",
        blogs: result,
        route: "./blog/index_content",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const blog_content = (req, res) => {
  const id = req.params.id;

  Blog.findById(id)
    .then((result) => {
      res.render("index", {
        blog: result,
        title: "Detay",
        route: "./blog/blog_detail",
      });
    })
    .catch((err) => {
      res.status(404).render("404", { title: "Sayfa Bulunamadı" });
    });
};

module.exports = {
  blogs_index,
  blog_content,
};
