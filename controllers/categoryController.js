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

exports.delete_category_get = function (req, res, next) {
  //   Category.findById(req.params.id).exec((err, results) => {
  //     if (err) {
  //       return next(err);
  //     }
  //     res.render("categoryDelete", { category: results });
  //   });

  async.parallel(
    {
      items: function (callback) {
        Item.find({ category: req.params.id }).exec(callback);
      },
      category: function (callback) {
        Category.findById(req.params.id).exec(callback);
      },
    },
    (err, results) => {
      if (err) {
        return next(err);
      }
      console.log(results);
      if (results.items === null) {
        res.render("categoryDelete", {
          category: results.category,
          items: null,
        });
      } else {
        res.render("categoryDelete", {
          category: results.category,
          items: results.items,
        });
      }
    }
  );
};

exports.delete_category_post = function (req, res, next) {
  Category.deleteOne({ _id: req.params.id }, (err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/category");
  });
};
