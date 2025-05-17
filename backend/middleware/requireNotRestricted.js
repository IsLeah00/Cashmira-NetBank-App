module.exports = (req, res, next) => {
  if (req.user.restricted) {
    return res.status(403).json({ error: "Your account is restricted." });
  }
  next();
};
