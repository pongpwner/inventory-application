var express = require("express");
var router = express.Router();
var category_controller = require("../controllers/categoryController");

router.get("/", category_controller.category_list);
router.get("/add", category_controller.category_form);
router.post("/add", category_controller.add_category);

router.get("/:id/delete", category_controller.delete_category_get);
router.post("/:id/delete", category_controller.delete_category_post);
module.exports = router;
