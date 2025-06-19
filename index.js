require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");

const app = express();

const userRouter = require("./router/userRouter");
const addHomeRouter = require("./router/addHomeRouter");
const favRouter = require("./router/favRouter");
const authMiddleWare = require("./auth/authMiddleware");

// Middleware
app.use(express.json());
app.use(cors());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/airbnb", userRouter);
app.use("/api/airbnb", addHomeRouter);
app.use("/api/airbnb", authMiddleWare, favRouter);

// Connect DB and start server
const port = 3003;

mongoose.connect(process.env.DB_url).then(() => {
  app.listen(port, () => {});
});
