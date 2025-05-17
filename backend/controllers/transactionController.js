const User = require('../models/User');
const Card = require('../models/Card');
const Transaction = require('../models/Transaction');
const Filter = require('bad-words');
const filter = new Filter();

const funWords = [
  'duck',
  'sick',
  'fluff',
  'noodle',
  'zipp-zapp',
  'waffle',
  'banana',
  'whoopsie',
  'meow',
  'sparklebutt'
];

filter.replaceWord = () => {
  return funWords[Math.floor(Math.random() * funWords.length)];
};


const getCurrentBalance = async (req, res) => {
  try {
    const card = await Card.findOne({ userId: req.user.id });
    if (!card) return res.status(404).json({ error: "Card not found." });

    res.json({ balance: card.balance });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch balance." });
  }
};


const getAllTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch transactions." });
  }
};


const sendMoney = async (req, res) => {
  try {
    const { toCardNumber, amount, statement, payee } = req.body;

    if (!toCardNumber || !amount || amount <= 0 || !payee) {
      return res.status(400).json({ error: "Missing or invalid transfer data." });
    }

    const senderCard = await Card.findOne({ userId: req.user.id });
    if (!senderCard) return res.status(404).json({ error: "Your card not found." });

    if (senderCard.blocked) return res.status(403).json({ error: "Your card is blocked." });

    if (senderCard.balance < amount) {
      return res.status(400).json({ error: "Insufficient balance." });
    }

    const receiverCard = await Card.findOne({ cardNumber: toCardNumber });
    if (!receiverCard) return res.status(404).json({ error: "Recipient card not found." });

    const receiverUser = await User.findOne({ _id: receiverCard.userId });
    if (!receiverUser) return res.status(404).json({ error: "Recipient user not found." });

    if (receiverCard.cardNumber === senderCard.cardNumber) {
      return res.status(400).json({ error: "Cannot transfer to your own card." });
    }

    senderCard.balance -= amount;
    receiverCard.balance += amount;

    await senderCard.save();
    await receiverCard.save();

    const invoiceId = "INV-" + Math.floor(10000000 + Math.random() * 90000000);
    const profanityCheckedStatement = statement ? filter.clean(statement) : '';

    await Transaction.create({
      userId: req.user.id,
      cardId: senderCard._id,
      fromCardNumber: senderCard.cardNumber,
      toCardNumber,
      payee,
      invoiceNumber: invoiceId,
      amount: -amount,
      currency: "CHF",
      statement: profanityCheckedStatement,
    });

    await Transaction.create({
      userId: receiverUser._id,
      cardId: receiverCard._id,
      fromCardNumber: senderCard.cardNumber,
      toCardNumber: receiverCard.cardNumber,
      payee: `${req.user.firstName} ${req.user.lastName}`,
      invoiceNumber: invoiceId,
      amount: amount,
      currency: "CHF",
      statement: profanityCheckedStatement,
    });

    res.status(200).json({ message: "Transfer successful." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Transfer failed." });
  }
};

module.exports = {
  getCurrentBalance,
  getAllTransactions,
  sendMoney,
};
