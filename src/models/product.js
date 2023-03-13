const { Schema, model } = require("mongoose");

const ProductSchema = new Schema({
    name: {
      type: String,
      require: true
    },
    imageURL: {
      type: String,
    },
    description: {
      type: String,
      require: true
    },
    reviews: {
      type:  String,
      default: "[]"
    },
    price: {
      type: Number,
      require: true
    },
    actualPrice: {
      type: Number,
    },
    isAvailable: {
      type: Boolean,
      default: true
    }, 
})

const Product = model("Product", ProductSchema)
module.exports = Product;

