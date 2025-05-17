const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: { type: String, unique: true },
  password: String,
  phone: { type: String, unique: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  pin: Number,
  approved: { type: Boolean, default: false },
  suspended: { type: Boolean, default: false },
  restricted: { type: Boolean, default: false },
  restrictedTransfers: { type: Boolean, default: false },
});

module.exports = mongoose.model('User', userSchema);
