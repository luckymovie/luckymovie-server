const { successResponse, errorResponse } = require("../helpers/response");
const { registerNewUSer, getPassword } = require("../models/auth");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

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

const signIn = (req, res) => {
    //Get body (email and password)
    const {email, password} = req.body;

    //Match email and password
    getPassword(email)
    .then((result) => {
        const id = result.id;
        const role = result.role_id
        bcrypt.compare(password, result.password)
        .then((result) => {
            if(!result){
                return errorResponse(res, 400, {msg: "Email or password is incorrect"});
            }
            //Generate JWT
            const userPayload = {
                email,
                id,
                role

            };
            const jwtOptions = {
                issuer: process.env.JWT_ISSUER,
                expiresIn: "300000s"
            };
            const token = jwt.sign(userPayload, process.env.JWT_KEY, jwtOptions);
            successResponse(res, 200, {email, token, role}, null);
        })
        .catch((status, err) => {
            errorResponse(res, status, err);
        });
    })
    .catch(({status, err}) => {
        errorResponse(res, status, err);
    });
    
};
module.exports = { register, signIn};
