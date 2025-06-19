const express = require("express");
const userRouter = express.Router();

const userController = require("../controller/userController");

userRouter.post("/signup", userController.Signup);
userRouter.post("/login", userController.Login);

module.exports = userRouter;
