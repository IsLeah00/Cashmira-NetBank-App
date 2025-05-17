const User = require('../models/User');

const getCurrentUser = async (req, res) => {
  const user = await User.findById(req.user.id);
  if (!user) {
    res.status(404).json({ error: "User not found." });
    return null;
  }
  return user;
};

module.exports = getCurrentUser;
