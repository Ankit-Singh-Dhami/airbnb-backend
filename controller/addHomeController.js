const Home = require("../model/addHomeModel");

// GET all homes
exports.getHome = async (req, res, next) => {
  try {
    const homes = await Home.find();
    res.status(200).json(homes);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to fetch homes", error: error.message });
  }
};

// ADD a new home with image upload
exports.addHome = async (req, res, next) => {
  try {
    const { place, price, rating } = req.body;
    const imageUrl = `http://localhost:3003/uploads/${req.file.filename}`; // full URL

    const newHome = new Home({
      image: imageUrl,
      place,
      price,
      rating,
    });

    const savedHome = await newHome.save();
    res
      .status(201)
      .json({ message: "Home added successfully", home: savedHome });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to add home", error: error.message });
  }
};

// DELETE a home by ID
exports.deleteHome = async (req, res, next) => {
  try {
    const { homeId } = req.params;
    const deletedHome = await Home.findByIdAndDelete(homeId);

    if (!deletedHome) {
      return res.status(404).json({ message: "Home not found" });
    }

    res
      .status(200)
      .json({ message: "Home deleted successfully", home: deletedHome });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to delete home", error: error.message });
  }
};
