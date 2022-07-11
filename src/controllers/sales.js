const { errorResponse, successResponse } = require("../helpers/response");
const { getWeeklySales, getMonthlySales } = require("../models/sales");

const weeklySales = (req, res) => {
    const {movie_id} = req.body
    getWeeklySales(movie_id)
    .then((result) => {
        successResponse(res, 200, result)
    })
    .catch(({ status, err }) => {
        errorResponse(res, status, err);
    });
};

const monthlySales = (req, res) => {
    const {movie_id} = req.body
    getMonthlySales(movie_id)
    .then((result) => {
        successResponse(res, 200, result)
    })
    .catch(({ status, err }) => {
        errorResponse(res, status, err);
    });
};

module.exports = {
    weeklySales, monthlySales
}