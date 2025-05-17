const Card = require('../models/Card');

const getUserCard = async (req, res) => {
  const card = await Card.findOne({ userId: req.user.id });
  if (!card) {
    res.status(404).json({ error: "Card not found." });
    return null;
  }
  return card;
};

module.exports = getUserCard;
