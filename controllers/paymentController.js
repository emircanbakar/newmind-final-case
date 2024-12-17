const Payment = require("../models/payment");
const { v4: uuidv4 } = require("uuid");

exports.createPayment = async (req, res) => {
  const { userId, amount } = req.body;

  const transactionId = uuidv4(); // Benzersiz işlem ID'si oluşturuyoruz

  try {
    const newPayment = new Payment({
      userId,
      amount,
      transactionId,
      status: "pending",
    });

    await newPayment.save();
    res.status(201).json({ success: true, transactionId, amount });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getPaymentStatus = async (req, res) => {
  const { transactionId } = req.params;

  try {
    const payment = await Payment.findOne({ transactionId });
    if (!payment) {
      return res
        .status(404)
        .json({ success: false, message: "Payment not found" });
    }
    res.status(200).json({ success: true, status: payment.status });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
