const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, required: true },
  cardId: { type: mongoose.Schema.Types.ObjectId, required: true },
  fromCardNumber: { type: String, required: true },
  toCardNumber: { type: String, required: true },
  payee: { type: String, required: true },
  invoiceNumber: { type: String, required: true },
  amount: { type: Number, required: true },
  currency: { type: String, default: "CHF" },
  statement: { type: String },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Transaction', transactionSchema);
