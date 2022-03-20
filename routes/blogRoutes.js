const express = require("express");
const router = express.Router();
const blogController = require("../controllers/blogController");

router.get("/", blogController.blogs_index);
router.get("/:id", blogController.blog_content);

module.exports = router;
