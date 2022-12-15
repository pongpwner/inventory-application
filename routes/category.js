var express = require("express");
var router = express.Router();
var category_controller = require("../controllers/categoryController");

router.get("/add", category_controller.category_form);

module.exports = router;
