const Card = require('../models/Card');
const getUserCard = require('../utils/getUserCard');


const viewCardByPin = async (req, res) => {
  try {
    const userId = req.user.id;
    const pin = parseInt(req.query.pin);

    if (!pin || isNaN(pin)) {
      return res.status(400).json({ error: "PIN is required and must be a number." });
    }

    const card = await Card.findOne({ userId, pin });
    if (!card) {
      return res.status(403).json({ error: "Invalid PIN or no card found." });
    }

    res.json(card);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch card." });
  }
};


const renameCard = async (req, res) => {
  try {
    const { newName } = req.body;

    const card = await getUserCard(req, res);
    if (!card) return;

    card.cardName = newName;
    await card.save();

    res.json({ message: "Card renamed successfully.", card });
  } catch (err) {
    res.status(500).json({ error: "Failed to rename card." });
  }
};


const blockCard = async (req, res) => {
  try {
    const card = await Card.findOne({ _id: req.params.id, userId: req.user.id });
    if (!card) return res.status(404).json({ error: "Card not found." });

    card.blocked = !card.blocked;
    await card.save();

    res.json({ message: `Card has been ${card.blocked ? 'blocked' : 'unblocked'}.` });
  } catch (err) {
    res.status(500).json({ error: "Failed to update card block status." });
  }
};


const updateAtmLimit = async (req, res) => {
  try {
    const { limit } = req.body;

    const card = await getUserCard(req, res);
    if (!card) return;

    card.atmLimitDaily = limit;
    await card.save();

    res.json({ message: "Daily ATM limit updated.", card });
  } catch (err) {
    res.status(500).json({ error: "Failed to update ATM limit." });
  }
};


const updateTransferLimit = async (req, res) => {
  try {
    const { limit } = req.body;

    const card = await getUserCard(req, res);
    if (!card) return;

    card.transferLimitDaily = limit;
    await card.save();

    res.json({ message: "Daily transfer limit updated.", card });
  } catch (err) {
    res.status(500).json({ error: "Failed to update transfer limit." });
  }
};


const updatePurchaseLimit = async (req, res) => {
  try {
    const { limit } = req.body;

    const card = await getUserCard(req, res);
    if (!card) return;

    card.purchaseLimitDaily = limit;
    await card.save();

    res.json({ message: "Daily purchase limit updated.", card });
  } catch (err) {
    res.status(500).json({ error: "Failed to update purchase limit." });
  }
};

module.exports = {
  viewCardByPin,
  renameCard,
  blockCard,
  updateAtmLimit,
  updateTransferLimit,
  updatePurchaseLimit,
};
