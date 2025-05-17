const User = require('../models/User');
const Log = require('../models/Log');
const Transaction = require('../models/Transaction');


const getLogs = async (req, res) => {
  try {
    const logs = await Log.find().sort({ createdAt: -1 });
    res.json(logs);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch logs.' });
  }
};


const getPendingUsers = async (req, res) => {
  try {
    const pendingUsers = await User.find({ approved: false });
    res.json(pendingUsers);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch pending users.' });
  }
};


const approveUser = async (req, res) => {
  try {
    await User.findByIdAndUpdate(req.params.id, { approved: true });
    res.json({ message: 'User approved.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to approve user.' });
  }
};


const denyUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.json({ message: 'User denied and deleted.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete user.' });
  }
};


const getApprovedUsers = async (req, res) => {
  try {
    const users = await User.find({ approved: true });
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch approved users.' });
  }
};


const suspenseUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const newState = !user.suspended;
    user.suspended = newState;
    await user.save();

    res.json({ message: `User ${newState ? 'suspended' : 'unsuspended'}.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle suspension.' });
  }
};


const restrictUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const newState = !user.restricted;
    user.restricted = newState;
    await user.save();

    res.json({ message: `User access ${newState ? 'restricted' : 'unrestricted'}.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle restriction.' });
  }
};


const restrictUserTransfers = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    const newState = !user.restrictedTransfers;
    user.restrictedTransfers = newState;
    await user.save();

    res.json({ message: `User transfer permissions ${newState ? 'restricted' : 'unrestricted'}.` });
  } catch (err) {
    res.status(500).json({ error: 'Failed to toggle transfer restriction.' });
  }
};


const getTransactionsById = async (req, res) => {
  try {
    const userId = req.params.id;
    const transactions = await Transaction.find({ userId }).sort({ createdAt: -1 });

    if (!transactions.length)
      return res.status(404).json({ error: 'No transactions found for this user.' });

    res.json(transactions);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch transactions.' });
  }
};

module.exports = {
  getLogs,
  getPendingUsers,
  approveUser,
  denyUser,
  getApprovedUsers,
  suspenseUser,
  restrictUser,
  restrictUserTransfers,
  getTransactionsById
};
