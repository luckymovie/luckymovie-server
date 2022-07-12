const Router = require("express").Router();
const { createMovie, showMovieNow, showMovieUpcoming, showMovieDetail, editMovie } = require("../controllers/movies");
const uploadFile = require("../middlewares/fileUpload");
const { checkToken } = require("../middlewares/tokenValidations");

Router.post("/", checkToken, uploadFile, createMovie);
Router.patch("/:id", checkToken, uploadFile, editMovie);
Router.get("/", showMovieNow);
Router.get("/upcoming", showMovieUpcoming);
Router.get("/:id", showMovieDetail);

module.exports = Router;
