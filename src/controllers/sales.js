const { errorResponse, successResponse } = require("../helpers/response");
const { getSalesData } = require("../models/sales");

const getSales = (req, res) => {
    getSalesData(req.query)
    .then((result) => {
        successResponse(res, 200, result)
    })
    .catch(({ status, err }) => {
        errorResponse(res, status, err);
    });
};


module.exports = {
    getSales,
}