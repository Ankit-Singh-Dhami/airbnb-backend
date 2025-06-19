const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    role: {
      type: String,
      enum: ["user", "host"],
      default: "user",
    },

    // Optional: store favorites or home reference here later
    // favorites: [{ type: mongoose.Schema.Types.ObjectId, ref: "Home" }]
  },
  {
    timestamps: true, // Adds createdAt & updatedAt fields automatically
  }
);

module.exports = mongoose.model("User", userSchema);
