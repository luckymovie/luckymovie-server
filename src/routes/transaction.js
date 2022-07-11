const Router = require("express").Router();
const { createTransaction, showUserTicket, userHistory, allHistory, exportTransaction, generatePdf } = require("../controllers/transaction");
const { checkToken } = require("../middlewares/tokenValidations");
const { confirmPayment } = require("../models/transaction");

Router.post("/", checkToken, createTransaction);
Router.get("/", checkToken, allHistory);
Router.get("/history", checkToken, userHistory);
Router.get("/ticket/:trans_id", checkToken, showUserTicket);
Router.post("/midtrans-notification", confirmPayment);
Router.get("/export/:trans_id", checkToken, exportTransaction);
Router.get("/generate/pdf/:trans_id", generatePdf);

module.exports = Router;
