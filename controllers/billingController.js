const Invoice = require("../models/invoice");

exports.createInvoice = async (req, res) => {
  const { userId, transactionId, amount } = req.body;

  try {
    const newInvoice = new Invoice({
      userId,
      transactionId,
      amount,
    });

    await newInvoice.save();
    res.status(201).json({ success: true, invoice: newInvoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getInvoice = async (req, res) => {
  const { invoiceId } = req.params;

  try {
    const invoice = await Invoice.findById(invoiceId);
    if (!invoice) {
      return res
        .status(404)
        .json({ success: false, message: "Invoice not found" });
    }
    res.status(200).json({ success: true, invoice });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
