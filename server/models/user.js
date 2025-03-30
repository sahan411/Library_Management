const mongoose = require("mongoose");
const crypto = require("crypto");

// Creating user schema
const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  dob: {
    type: Date,
    required: false,
  },
  phone: {
    type: String,
    required: false,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false, // Default to false for non-admin users
  },
  photoUrl: {
    type: String,
    required: false, // Make photoUrl optional
  },
  password: { // Plain text password to be hashed
    type: String,
    required: true,
  },
  hash: String, // Store hashed password
  salt: String, // Store salt
}, { timestamps: true }); // Adds createdAt and updatedAt fields

// Method to set salt and hash the password for a user
UserSchema.methods.setPassword = function (password) {
  // Creating a unique salt for a particular user
  this.salt = crypto.randomBytes(16).toString("hex");

  // Hashing user's salt and password with 1000 iterations
  this.hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
};

// Method to check whether the entered password is correct or not
UserSchema.methods.isValidPassword = function (password) {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, `sha512`)
    .toString(`hex`);
  return this.hash === hash;
};

// Middleware to ensure the password is hashed before saving a new user
UserSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    this.setPassword(this.password); // Hash the password before saving
  }
  next();
});

module.exports = mongoose.model("User", UserSchema);
