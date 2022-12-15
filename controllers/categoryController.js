const async = require("async");
const Category = require("../models/category");
const Item = require("../models/item");

exports.category_form = function (req, res, next) {
  res.render("categoryForm");
};
