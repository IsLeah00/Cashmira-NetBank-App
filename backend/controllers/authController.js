const User = require('../models/User');
const Card = require('../models/Card');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { jwtSecret } = require('../config/jwt');

const isStrongPassword = (password) => {
  const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
  return regex.test(password);
};

const registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, phone, pin } = req.body;

    if (!isStrongPassword(password)) {
      return res.status(400).json({
        error:
          "Password must be at least 5 characters and include uppercase, lowercase, number, and special character!",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password: hashedPassword,
      phone,
      role: 'user',
      pin,
      approved: false,
    });

    const generateCardNumber = () => {
      const randomChunk = () => Math.floor(1000 + Math.random() * 9000);
      return `${randomChunk()}-${randomChunk()}-${randomChunk()}-${randomChunk()}`;
    };


    const getFormattedExpireDate = () => {
      const now = new Date();
      const future = new Date(now.setFullYear(now.getFullYear() + 5));
      const mm = String(future.getMonth() + 1).padStart(2, '1');
      const yy = String(future.getFullYear()).slice(-2);
      return `${mm}/${yy}`;
    };

    const newCard = await Card.create({
      cardName: "Default Card",
      cardOwner: `${firstName} ${lastName}`,
      cardNumber: generateCardNumber(),
      expireDate: getFormattedExpireDate(),
      cvv: Math.floor(100 + Math.random() * 900),
      pin: pin,
      blocked: false,
      atmLimitDaily: 1000,
      transferLimitDaily: 1000,
      purchaseLimitDaily: 1000,
    });

    res.status(201).json({ message: "Registration successful. Please await approval..." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Registration failed. Contact support!" });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    
    if (!user) {
      return res.status(404).json({ error: 'Account not found or deleted' });
    }

    if (user.suspended)
      return res.status(403).json({ error: "Your account is currently suspended." });

    if (!user)
      return res.status(400).json({ error: "Invalid email or password." });

    if (!user.approved)
      return res.status(403).json({ error: "Account not yet approved." });

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch)
      return res.status(400).json({ error: "Invalid email or password." });

    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        role: user.role,
      },
      jwtSecret,
      { expiresIn: '2h' }
    );

    res.status(200).json({
      message: "Login successful.",
      token,
      user: {
        id: user._id,
        name: `${user.firstName} ${user.lastName}`,
        email: user.email,
        role: user.role,
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Login failed." });
  }
};


module.exports = { registerUser, loginUser };
