const mongoose = require('mongoose');

const cardSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId,
  cardName: String,
  cardOwner: String,
  cardNumber: { type: String, unique: true},
  expireDate: String,
  cvv: Number,
  pin: Number,
  balance: { type: Number, default: 0, min: [0, "Balance cannot be negative"] },
  blocked: Boolean,
  atmLimitDaily: Number,
  transferLimitDaily: Number,
  purchaseLimitDaily: Number,
});

module.exports = mongoose.model('Card', cardSchema);
