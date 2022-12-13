#! /usr/bin/env node

console.log(
  "This script populates some test books, authors, genres and bookinstances to your database. Specified database as argument - e.g.: populatedb mongodb+srv://cooluser:coolpassword@cluster0.a9azn.mongodb.net/local_library?retryWrites=true"
);

// Get arguments passed on command line
var userArgs = process.argv.slice(2);
/*
if (!userArgs[0].startsWith('mongodb')) {
    console.log('ERROR: You need to specify a valid mongodb URL as the first argument');
    return
}
*/
var async = require("async");

//
var Item = require("./models/item");
var Category = require("./models/category");

var mongoose = require("mongoose");

var mongoDB =
  "mongodb+srv://pong:pong@cluster0.q0ioy8c.mongodb.net/?retryWrites=true&w=majority";
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on("error", console.error.bind(console, "MongoDB connection error:"));

//
var items = [];
var categories = [];

function itemCreate(name, description, category, price, stock, cb) {
  itemdetail = {
    name: name,
    description: description,
    category: category,
    price: price,
    stock: stock,
  };
  var item = new Item(itemdetail);

  item.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Item:" + item);
    items.push(item);
    cb(null, item);
  });
}

function categoryCreate(name, description, cb) {
  categorydetail = { name: name, description: description };
  var category = new Category(categorydetail);
  category.save(function (err) {
    if (err) {
      cb(err, null);
      return;
    }
    console.log("New Category: " + category);
    categories.push(category);
    cb(null, category);
  });
}

function createItems(cb) {
  // name: name,
  // description: description,
  // category: category,
  // price: price,
  // stock: stock,
  async.series(
    [
      function (callback) {
        itemCreate("yoyo", "goes up and down", categories[0], 25, 1, callback);
      },
    ],
    cb
  );
}
function createCategories(cb) {
  //name description
  async.series(
    [
      function (callback) {
        categoryCreate("toy", "entertainment for children", callback);
      },
    ],
    cb
  );
}

async.series(
  [createCategories, createItems],
  // Optional callback
  function (err, results) {
    if (err) {
      console.log("FINAL ERR: " + err);
    } else {
      console.log("successs");
    }
    // All done, disconnect from database
    mongoose.connection.close();
  }
);
