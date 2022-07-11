const express = require("express");
const Router = express.Router();
const authController = require("../controllers/sales");
const tokenValidation = require("../middlewares/tokenValidations");

//Get sales
Router.get("/", tokenValidation.checkToken, authController.getSales);


module.exports = Router;
