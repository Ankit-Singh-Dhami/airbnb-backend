const Fav = require("../model/favModel");

// GET all favorites
exports.getFav = async (req, res) => {
  try {
    const favs = await Fav.find();
    res.status(200).json(favs);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch favorites", error: error.message });
  }
};

exports.addFav = async (req, res) => {
  try {
    const { homeId, image, place, price, rating } = req.body;

    if (!homeId || !image || !place || !price || !rating) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newFav = new Fav({
      home: homeId, // store home._id here
      image,
      place,
      price,
      rating,
      user: req.user?._id,
    });

    const savedFav = await newFav.save();
    res
      .status(201)
      .json({ message: "Favorite added successfully", favorite: savedFav });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add favorite", error: error.message });
  }
};

// DELETE a favorite by ID
exports.deleteFav = async (req, res) => {
  try {
    const { favId, home } = req.params;

    let deletedFav = null;

    if (favId) {
      deletedFav = await Fav.findByIdAndDelete(favId);
    } else if (homeId) {
      deletedFav = await Fav.findOneAndDelete({ home: home });
    }

    if (!deletedFav) {
      return res.status(404).json({ message: "Favorite not found" });
    }

    res.status(200).json({
      message: "Favorite deleted successfully",
      favorite: deletedFav,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete favorite",
      error: error.message,
    });
  }
};
