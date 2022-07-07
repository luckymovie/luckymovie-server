const express = require("express");
const Router = express.Router();
const userController = require("../controllers/user");
const tokenValidation = require("../middlewares/tokenValidations");
const uploadFile = require("../middlewares/fileUpload");
const validate = require("../middlewares/userValidation");

//Get Profile
Router.get("/", tokenValidation.checkToken, userController.getMyProfile);

//Update Profile
Router.patch("/", tokenValidation.checkToken, uploadFile, validate.checkUpdateForm, userController.updateMyProfile);

module.exports = Router;
