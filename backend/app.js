const express = require('express');
const cors = require('cors');
const connectDB = require('./db');

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/user', require('./routes/userRoutes'));

app.get('/', (req, res) => {
  res.send('Cashmira backend is running');
});

const PORT = process.env.PORT || 8080;
const server = app.listen(PORT, () => {
  console.log(`Backend server running on http://localhost:${PORT}...`);
});

process.on('SIGINT', () => {
  console.log(`\nShutdown backend server on http://localhost:${PORT}...`);
  server.close(() => {
    process.exit(0);
  });
});
