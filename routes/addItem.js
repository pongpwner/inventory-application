var express = require("express");
var router = express.Router();
var item_controller = require("../controllers/itemController");
/* GET home page. */
router.get("/", item_controller.item_form);

module.exports = router;

router.post("/", item_controller.add_item);
