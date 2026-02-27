/* Create imports */
const mongoose = require("mongoose");
const { Schema } = mongoose;
const bcrypt = require("bcrypt");
const { isEmail } = require("validator");
const crypto = require("crypto");

/* Create schema */
const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
      validate: [isEmail, "Please provide a valid email"],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },
    maxReviewsAllowed: {
      type: Number,
      default: 5,
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

/* Create methods */
userSchema.virtual("gravatarUrl").get(function () {
  const email = this.email.toLowerCase().trim();
  const hash = crypto.createHash("sha256").update(email).digest("hex");
  return `https://www.gravatar.com/avatar/${hash}?d=identicon&s=200`;
});

userSchema.methods.getReviewsRemaining = async function () {
  const Review = require("./Review");
  const count = await Review.countDocuments({ userId: this._id });
  return this.maxReviewsAllowed - count;
};

userSchema.methods.canGenerateReview = async function () {
  const Review = require("./Review");
  const count = await Review.countDocuments({ userId: this._id });
  return count < this.maxReviewsAllowed;
};

userSchema.statics.register = async function (name, email, password) {
  if (!name || !email || !password) {
    throw new Error("All fields must be filled.");
  }

  const user = await this.findOne({ email: email });
  if (user) {
    throw new Error("User already registered.");
  }

  const newUser = await this.create({ name, email, password });
  return this.findById(newUser._id).select("-password");
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw new Error("All fields must be filled.");
  }

  const currentUser = await this.findOne({ email: email }).select("+password");
  if (!currentUser) {
    throw new Error("User not registered.");
  }

  const match = await bcrypt.compare(password, currentUser.password);
  if (!match) {
    throw new Error("Passwords don't match.");
  }

  const user = await this.findById(currentUser._id).select("-password");
  return user;
};

userSchema.pre("save", async function () {
  if (!this.isModified("password") || !this.password) {
    return;
  }

  try {
    this.password = await bcrypt.hash(this.password, 10);
  } catch (error) {
    console.error(error);
    throw new Error(error.message);
  }
});

/* Create export */
const User = mongoose.model("User", userSchema);
module.exports = User;
