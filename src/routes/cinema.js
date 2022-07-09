const { showMovieCinema, showCinemaSeat, createCinema } = require("../controllers/cinemas");

const Router = require("express").Router();
const { checkToken } = require("../middlewares/tokenValidations");

Router.post("/", checkToken, createCinema);
Router.get("/", showMovieCinema);
Router.get("/seat", showCinemaSeat);

module.exports = Router;
