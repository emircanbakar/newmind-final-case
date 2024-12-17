const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentController");

router.post("/payment", paymentController.createPayment); // Ödeme başlat
router.get("/payment/:transactionId", paymentController.getPaymentStatus); // Ödeme durumunu kontrol et

module.exports = router;
