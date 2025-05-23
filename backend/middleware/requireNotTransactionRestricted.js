module.exports = (req, res, next) => {
  if (req.user.restrictedTransfers) {
    return res.status(403).json({ error: "You are not allowed to perform transfers." });
  }
  next();
};
