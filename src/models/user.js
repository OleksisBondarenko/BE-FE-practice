const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    require: true,
  },
  activatedDate: {
    type: String,
    default: Date.now()
  },
  isActive: {
    type: Boolean,
    default: true
  },
  buyedProducts: {
    type: String,
  },
  cartProducts: {
    type: String,
  },
  imageURI: {
    type: String
  },
})

const User = model("User", UserSchema)
module.exports = User;  