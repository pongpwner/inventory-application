const async = require("async");
const Category = require("../models/category");
const Item = require("../models/item");

exports.category_form = function (req, res, next) {
  res.render("categoryForm");
};

exports.add_category = function (req, res, next) {
  let categoryDetails = {
    name: req.body.categoryName,
    description: req.body.categoryDescription,
  };
  let newCategory = new Category(categoryDetails);
  newCategory.save((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
};

exports.category_list = function (req, res, next) {
  Category.find({})
    .sort({ name: 1 })
    .exec((err, listCategories) => {
      if (err) {
        return listCategories;
      }
      res.render("categoryList", { categories: listCategories });
    });
};
