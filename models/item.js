var mongoose = require("mongoose");

var ItemSchema = new mongoose.Schema({
  name: { type: String, required: true }
});

var Item = mongoose.model("Item", ItemSchema);

module.exports = Item;