const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

// userSchema for UserModel with different data fields it takes/stores
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    validate: [validator.isEmail, "Please Provide a valid email"],
    trim: true,
  },
  phone: {
    type: Number,
    required: [true, "Phone number is required"],
    unique: true,
    maxlength: 12,
    minlength: 10,
  },
  password: {
    type: String,
    required: [true, "A user needs a password."],
    minlength: 8,
    maxlength: 16,
  },
  confirmPassword: {
    type: String,
    required: [true, "A user needs a password."],
    minlength: 8,
    maxlength: 16,
  },
});

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, 12);
  this.confirmPassword = undefined;
  next();
});

const User = mongoose.model("User", userSchema);

module.exports = User;
