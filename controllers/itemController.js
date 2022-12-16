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

exports.get_item = function (req, res, next) {
  Item.findById(req.params.id)
    .populate("category")
    .exec(function (err, result) {
      if (err) {
        return next(err);
      }
      console.log(result.category);
      res.render("item", { item: result, deleteItem: "deleteItem();" });
    });
};
exports.delete_item_post = function (req, res, next) {
  Item.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.delete_item_get = function (req, res, next) {
  Item.findById(req.params.id).exec((err, result) => {
    if (err) {
      return next(err);
    }
    res.render("itemDelete", { item: result });
  });
};

exports.update_item_post = function (req, res, next) {
  let itemDetails = {
    name: req.body.itemName,
    description: req.body.itemDescription,
    category: req.body.itemCategory,
    price: req.body.itemPrice,
    stock: req.body.itemStock,
  };
  Item.findOneAndUpdate({ _id: req.params.id }, itemDetails).exec(
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.redirect(`/item/${req.params.id}`);
    }
  );
};

exports.update_item_get = function (req, res, next) {
  async.parallel(
    {
      item: function (callback) {
        Item.findById(req.params.id).exec(callback);
      },
      categories: function (callback) {
        Category.find({}).sort({ name: 1 }).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      res.render("itemUpdate", {
        categories: results.categories,
        item: results.item,
      });
    }
  );
};
