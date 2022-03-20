const express = require("express");
const router = express.Router();
const adminController = require("../controllers/adminController");

router.get("/", adminController.admin_index);
router.get("/add", adminController.admin_add);
router.post("/add", adminController.admin_add_post);
router.delete("/delete/:id", adminController.admin_delete);
router.get("/edit/:id", adminController.admin_edit);
router.post("/edit/:id", adminController.admin_edit_post);
module.exports = router;
