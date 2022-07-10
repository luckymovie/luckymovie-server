const { getMovieCinema, getCinemaSeat, postCinema } = require("../models/cinemas");
const groupWithCinema = require("../helpers/groupWithCinema");

const showMovieCinema = async (req, res) => {
  try {
    const { data } = await getMovieCinema(req.query);
    const group = groupWithCinema(data, "name");
    const cinema = Object.entries(group).map((name) => {
      return { name: name[0], detail: name[1] };
    });

    res.status(200).json({
      data: cinema,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      error: error.message,
    });
  }
};

const showCinemaSeat = async (req, res) => {
  try {
    const { data } = await getCinemaSeat(req.query);
    res.status(200).json({
      data,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      error: error.message,
    });
  }
};

const createCinema = async (req, res) => {
  try {
    const { data, message } = await postCinema(req.body);
    res.status(200).json({
      data,
      message,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      error: error.message,
    });
  }
};

module.exports = { showMovieCinema, showCinemaSeat, createCinema };
