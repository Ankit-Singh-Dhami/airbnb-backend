const express = require("express");
const favRouter = express.Router();
const favController = require("../controller/favController");
const multer = require("multer");

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/fav-images/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage });

// Routes
favRouter.get("/favourites", favController.getFav);
favRouter.post("/favourites", upload.single("image"), favController.addFav);
favRouter.delete("/favourites/:favId", favController.deleteFav);

module.exports = favRouter;
