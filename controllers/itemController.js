const Item = require("../models/item");
const Category = require("../models/category");
const async = require("async");
exports.item_list = function (req, res, next) {
  Item.find({})
    .sort({ name: 1 })
    .exec(function (err, list_items) {
      if (err) {
        return next(err);
      }
      console.log(list_items);
      res.render("index", { title: "Item List", item_list: list_items });
    });
};

exports.item_form = function (req, res, next) {
  Category.find({})
    .sort({ name: 1 })
    .exec(function (err, list_category) {
      if (err) {
        return next(err);
      }
      console.log(list_category);
      res.render("itemForm", { categories: list_category });
    });
  //res.render("itemForm", { categories: [{ name: "red" }, { name: "blue" }] });
};

exports.add_item = function (req, res, next) {
  let itemDetails = {
    name: req.body.itemName,
    description: req.body.itemDescription,
    category: req.body.itemCategory,
    price: req.body.itemPrice,
    stock: req.body.itemStock,
  };
  let newItem = new Item(itemDetails);
  newItem.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};
