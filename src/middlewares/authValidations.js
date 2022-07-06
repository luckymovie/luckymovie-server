const {errorResponse} = require("../helpers/response");
const {getEmail} = require("../models/auth");
const { body, validationResult } = require("express-validator");

const checkRegistedEmail = (req, res, next) => {
    getEmail(req.body.email)
    .then((result) => {
        if(result.rowCount !== 0){
            return errorResponse(res, 400, {msg: "Email is already registered"});
        }
        next();
    })
    .catch((error) => {
        const {status, err} = error;
        errorResponse(res, status, err);
    });
};

const register = [
    body("email")
        .isEmail()
        .withMessage("Email format must be youremail@email")
        .normalizeEmail(),
    body("password")
        .isLength({ min: 8 })
        .withMessage("Password must be at least 8 characters")
        .matches(/\d/)
        .withMessage("Password must contain a number")
];

const checkForm = [
    register,
    (req, res, next) => {
      const error = validationResult(req);
      if (!error.isEmpty()) {
        return errorResponse(res, 400, {msg: error.array()})
      }
      next();
    },
];

module.exports = {
    checkRegistedEmail, checkForm
};
