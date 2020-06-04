const mongoose = require("mongoose");
const crypto = require("crypto");


// Active orders schema
activeOrdersSchema = new mongoose.Schema({
  item_name: String,
  item_price: String,
  to_user: String
})

// Restaurant Schema
const restaurantSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  restaurant_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  password: String,
  salt: String,
  contact: String,
  role: {
    type: String,
    default: "RESTAURANT"
  },
  orders: [activeOrdersSchema],
}); 

// Hash and salt
restaurantSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(64).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
}

//Validation
restaurantSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
  return hash === this.password
}


module.exports = mongoose.model("Restaurant", restaurantSchema);