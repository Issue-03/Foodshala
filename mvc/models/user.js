const mongoose = require("mongoose");
const crypto = require("crypto");

// Order schema
const orderSchema = new mongoose.Schema({
  item_name: String,
  item_price: Number,
  from_rest: String,

});

// User schema 
const userSchema = new mongoose.Schema({
  name: {
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
  preference: String,
  contact: String,
  role: {
    type: String,
    default: "USER"
  },
  orders: [orderSchema],
});

// Set password using hash and salts
userSchema.methods.setPassword = function (password) {
  this.salt = crypto.randomBytes(64).toString('hex');
  this.password = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
}

// Validate password method
userSchema.methods.validatePassword = function (password) {
  const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, "sha512").toString("hex");
  return hash === this.password
}


module.exports = mongoose.model("Order", orderSchema);
module.exports = mongoose.model("User", userSchema);
