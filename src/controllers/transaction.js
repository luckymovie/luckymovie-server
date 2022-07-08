const { createPayment } = require("../config/midtrans");
const { postTransaction, getUserTicket, confirmPayment } = require("../models/transaction");

const createTransaction = async (req, res) => {
  try {
    const userId = req.userPayload.id;
    const { data } = await postTransaction(req.body, userId);
    const { url } = await createPayment(data.orderId, data.total_payment);
    res.status(200).json({
      url,
      message: "Trasaction sucessfully created,please make a payment",
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      error: error.message,
    });
  }
};

const showUserTicket = async (req, res) => {
  try {
    const { data } = await getUserTicket(req.userPayload.id);
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

const paymentConfirm = async () => {
  try {
    const { data } = await confirmPayment(req.body);
    res.sstatus(200).status({
      data,
    });
  } catch (error) {
    const status = error.status || 500;
    res.status(status).json({
      error: error.message,
    });
  }
};

module.exports = { createTransaction, showUserTicket, paymentConfirm };
