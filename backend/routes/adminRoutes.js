const express = require('express');
const router = express.Router();
const {
  getLogs,
  getPendingUsers,
  approveUser,
  denyUser,
  getApprovedUsers,
  suspenseUser,
  restrictUser,
  restrictUserTransfers,
  getTransactionsById
} = require('../controllers/adminController');

const authenticateJWT = require('../middleware/auth');
const requireAdmin = require('../middleware/requireAdmin');

router.use(authenticateJWT, requireAdmin);

router.get('/logs', getLogs);

router.get('/registrations', getPendingUsers);
router.patch('/approve/:id', approveUser);
router.delete('/deny/:id', denyUser);

router.get('/users', getApprovedUsers);
router.patch('/suspense/:id', suspenseUser);
router.patch('/restrict/:id', restrictUser);
router.patch('/restrict-transfers/:id', restrictUserTransfers);

router.get('/transactions/:id', getTransactionsById);

module.exports = router;
