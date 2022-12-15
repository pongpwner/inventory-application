var express = require("express");
var router = express.Router();
var item_controller = require("../controllers/itemController");
/* GET home page. */
router.get("/add", item_controller.item_form);

router.post("/add", item_controller.add_item);

router.get("/:id", item_controller.get_item);

router.get("/:id/delete", item_controller.delete_item_get);
router.post("/:id/delete", item_controller.delete_item_post);

module.exports = router;
