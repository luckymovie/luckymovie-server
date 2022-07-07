const express = require("express");
const Router = express.Router();
const authController = require("../controllers/auth");
const authValidation = require("../middlewares/authValidations");
// const imageUpload = require("../middleware/fileUpload");
// const validate = require("../middleware/userValidation");

//Register
Router.post("/new", authValidation.checkRegisterForm, authValidation.checkRegistedEmail, authController.register);

// //Sign In
Router.post("/", authValidation.checkSigInForm, authController.signIn);

// //Sign Out
// Router.delete("/signout", authController.signout);

module.exports = Router;
