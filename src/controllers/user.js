const { getUser, updateUser } = require("../models/user");
const {errorResponse, successResponse, searchResponse} = require("../helpers/response");

const getMyProfile = (req, res) => {
    getUser(req.userPayload)
    .then((result) => {
        successResponse(res, 202, result, null);
    })
    .catch(({err, status}) => {
        errorResponse(res, status, err);
    });
};

const updateMyProfile = (req, res) => {
    const {file = null} = req;
    let picture;
    if(file){
        picture = req.file.path;
    }
    updateUser(req.body, req.userPayload, picture)
    .then(({data, message}) => {
        successResponse(res, 200, {msg: message})
    })
    .catch(({error, status}) => {
        errorResponse(res, status, error)
    });
};

module.exports = {
    getMyProfile, updateMyProfile
};