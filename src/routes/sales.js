const express = require("express");
const Router = express.Router();
const authController = require("../controllers/sales");
const tokenValidation = require("../middlewares/tokenValidations");

// Get All movie sales
Router.get("/all", authController.getAllMoviesSales);
//Get sales
Router.get("/", tokenValidation.checkToken, authController.getSales);

module.exports = Router;
