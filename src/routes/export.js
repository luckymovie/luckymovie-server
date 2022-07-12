const { exportTransaction, printPdf, downloadPdf, printTransaction } = require("../controllers/export");
const { checkToken } = require("../middlewares/tokenValidations");

const Router = require("express").Router();

Router.get("/:trans_id", checkToken, exportTransaction);
Router.get("/print/:trans_id", checkToken, printTransaction);
Router.get("/print/pdf/:trans_id", printPdf);
Router.get("/download/pdf/:trans_id", downloadPdf);

module.exports = Router;
