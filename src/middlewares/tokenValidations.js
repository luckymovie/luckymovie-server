const {errorResponse} = require("../helpers/response");
const jwt = require("jsonwebtoken");

const checkResetToken = (req, res, next) => {
    const bearerToken = req.header("x-access-token");
    const token = bearerToken.split(" ")[1];
    
    if(!bearerToken){
        return errorResponse(res, 401, {msg: "Sign in needed"});
    }
    //Token Verification
    jwt.verify(token, process.env.JWT_KEY, {issuer: process.env.JWT_ISSUER}, (err, payload) => {
        if(err && err.name === "TokenExpiredError"){
            return errorResponse(res, 401, {msg: "The link has expired. Please make a new request."});
        }
        if(err){
            return errorResponse(res, 401, {msg: "Access denied"});
        }
        req.userPayload = payload;
        
        next();
    });
}; 

module.exports = {
    checkResetToken
};