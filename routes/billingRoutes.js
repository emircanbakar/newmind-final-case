const express = require("express");
const router = express.Router();
const billingController = require("../controllers/billingController");

router.post("/invoice", billingController.createInvoice); // Fatura oluştur
router.get("/invoice/:invoiceId", billingController.getInvoice); // Fatura bilgisi al

module.exports = router;
