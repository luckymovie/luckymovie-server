const express = require("express");
const Router = express.Router();
const authController = require("../controllers/sales");
const tokenValidation = require("../middlewares/tokenValidations");

//Weekly sales
Router.get("/weekly", tokenValidation.checkToken, authController.weeklySales);

//Monthly sales
Router.get("/monthly", tokenValidation.checkToken, authController.monthlySales);

module.exports = Router;
