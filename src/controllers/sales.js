const groupWithCinema = require("../helpers/groupWithCinema");
const { errorResponse, successResponse } = require("../helpers/response");
const { getSalesData, getDataMovies } = require("../models/sales");

const getSales = (req, res) => {
  getSalesData(req.query)
    .then((result) => {
      successResponse(res, 200, result);
    })
    .catch(({ status, err }) => {
      errorResponse(res, status, err);
    });
};
const getAllMoviesSales = async (req, res) => {
  try {
    const { data } = await getDataMovies(req.query);
    const title = groupWithCinema(data, "title");
    const sales = Object.entries(title).map((item) => {
      return { title: item[0], detail: item[1] };
    });
    res.status(200).json({
      data: sales
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      error: error.message,
    });
  }
};

module.exports = {
  getSales,
  getAllMoviesSales,
};
