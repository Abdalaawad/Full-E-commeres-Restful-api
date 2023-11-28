const mongoose = require(`mongoose`);
const validator = require(`validator`);
const user = new mongoose.Schema(
  {
    firstName: {
      type: String,
      require: [true, "You Must Entre firstName"],
      trim: true,
      minlength: 3,
    },
    lastName: {
      type: String,
      require: [true, "You Must Entre lastName"],
      trim: true,
      minlength: 3,
    },
    email: {
      type: String,
      // validation: validator.isEmail(),
      unique: true,
      minlength: 5,
    },
    password: {
      type: String,
      require: [true, "You Must Entre Password"],
      minlength: 6,
    },
    token: {
      type: String,
    },
    role: {
      type: String,
      enum: ["user", "manager", "admin"],
      default: "user",
    },
    ResetTokenPassword: String,
    ResetTokenPasswordExpire: Date,
    confirmPassword: String,
  },
  {
    timestamps: true,
  }
);
module.exports = mongoose.model(`User`, user);
