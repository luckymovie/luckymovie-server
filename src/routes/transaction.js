const Router = require("express").Router();
const { createTransaction, showUserTicket } = require("../controllers/transaction");
const { checkToken } = require("../middlewares/tokenValidations");
const { confirmPayment } = require("../models/transaction");

Router.post("/", checkToken, createTransaction);
Router.get("/ticket", checkToken, showUserTicket);
Router.post("/midtrans-notification", confirmPayment);

module.exports = Router;
