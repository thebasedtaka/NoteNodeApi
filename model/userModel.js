const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
// creates a user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name is required"],
    trim: true,
    maxLength: [20, "Name cannot exceed 20 characters"],
    minLength: [3, "Name should have more than 3 characters"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
    trim: true,
    unique: true,
    lowercase: true,
    maxLength: [50, "Email cannot exceed 50 characters"],
    minLength: [5, "Email should have more than 5 characters"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    maxLength: [40, "Password cannot exceed 40 characters"],
    minLength: [8, "Password should have more than 8 characters"],
  },
  passwordConfirm: {
    type: String,
    required: [true, "Password is required"],
    trim: true,
    validate: {
      validator: function (pass) {
        return pass === this.password;
      },
    },
  },
});

/**
 * Hash the password before saving the user model.
 * @param {string} password - The password provided by the user.
 * @param {string} confirmPassword - The password provided by the user.
 * @package {bcrypt} A promise that resolves to the hashed password.
 */

userSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next();

    this.password = await bcrypt.hash(this.password, 10);
    this.passwordConfirm = undefined;
    next();
  } catch (error) {
    next(error);
  }
});

/**
 * Compare the candidate password with the user password using bcrypt.
 * @param {string} candidatePassword - The password provided by the user.
 * @param {string} userPassword - The hashed password stored in the database.
 * @returns {Promise<boolean>} - A promise that resolves to true if the candidate password matches the user password, otherwise false.
 */
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
