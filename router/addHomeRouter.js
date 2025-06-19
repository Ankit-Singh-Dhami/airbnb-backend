const express = require("express");
const addHomeRouter = express.Router();
const multer = require("multer");
const addHomeController = require("../controller/addHomeController");

// Multer setup
const storage = multer.diskStorage({
  destination: "./uploads",
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${file.originalname}`;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

// Routes
addHomeRouter.get("/homes", addHomeController.getHome);
addHomeRouter.post("/homes", upload.single("image"), addHomeController.addHome);
addHomeRouter.delete("/homes/:homeId", addHomeController.deleteHome);

module.exports = addHomeRouter;
