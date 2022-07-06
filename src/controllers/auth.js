const { successResponse, errorResponse } = require("../helpers/response");
const { registerNewUSer } = require("../models/auth");
const bcrypt = require("bcrypt");

const register = (req, res) => {
    const {email, password} = req.body;
    bcrypt.hash(password, 10)
    .then((hashedPassword) => {
        registerNewUSer(email, hashedPassword)
        .then(() => {
            successResponse(res, 201, {msg: "User successfully registered"}, null);
        })
        .catch((err) => {
            const {status, error} = err;
            console.log(err)
            errorResponse(res, status, error);
        });
    })
    .catch(({status, err}) => {
        errorResponse(res, status, err);
    });
};

module.exports = {register};
