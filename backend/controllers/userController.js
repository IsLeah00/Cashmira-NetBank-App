const bcrypt = require('bcryptjs');
const getCurrentUser = require('../utils/getCurrentUser');


const getUserData = async (req, res) => {
  try {
    const user = await getCurrentUser(req, res);
    if (!user) return;

    res.json(user.toObject({ getters: true, versionKey: false, transform: (_, ret) => { delete ret.password; return ret; } }));
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch user data." });
  }
};


const updateName = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    if (!firstName && !lastName)
      return res.status(400).json({ error: "Please provide a first and/or last name to update." });

    const user = await getCurrentUser(req, res);
    if (!user) return;

    if (firstName) user.firstName = firstName;
    if (lastName) user.lastName = lastName;
    await user.save();

    res.json({ message: "Name updated successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to update name." });
  }
};


const updateEmail = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await getCurrentUser(req, res);
    if (!user) return;

    user.email = email;
    await user.save();

    res.json({ message: "Email updated successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to update email." });
  }
};


const updatePhone = async (req, res) => {
  try {
    const { phone } = req.body;
    const user = await getCurrentUser(req, res);
    if (!user) return;

    user.phone = phone;
    await user.save();

    res.json({ message: "Phone number updated successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to update phone number." });
  }
};


const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await getCurrentUser(req, res);
    if (!user) return;

    const match = await bcrypt.compare(oldPassword, user.password);
    if (!match) return res.status(403).json({ error: "Incorrect current password." });

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to update password." });
  }
};


const updatePin = async (req, res) => {
  try {
    const { newPin } = req.body;
    const user = await getCurrentUser(req, res);
    if (!user) return;

    user.pin = newPin;
    await user.save();

    res.json({ message: "PIN updated successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to update PIN." });
  }
};


const deleteAccount = async (req, res) => {
  try {
    const { password } = req.body;
    const user = await getCurrentUser(req, res);
    if (!user) return;

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(403).json({ error: "Incorrect password." });

    await user.deleteOne();
    res.json({ message: "Account deleted successfully." });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete account." });
  }
};

module.exports = {
  getUserData,
  updateName,
  updateEmail,
  updatePhone,
  updatePassword,
  updatePin,
  deleteAccount,
};
