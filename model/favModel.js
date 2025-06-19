const mongoose = require("mongoose");

const favSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // optional: link favorite to a user
    },

    home: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Home",
      required: true,
    },

    image: {
      type: String,
      required: true,
      trim: true,
    },

    place: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 0,
      max: 5,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Favorite", favSchema);
