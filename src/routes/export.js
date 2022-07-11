const { exportTransaction, generatePdf } = require("../controllers/export");
const { checkToken } = require("../middlewares/tokenValidations");

const Router = require("express").Router();

Router.get("/:trans_id", checkToken, exportTransaction);
Router.get("/generate/pdf/:trans_id", generatePdf);

module.exports = Router;
