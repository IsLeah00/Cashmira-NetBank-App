const express = require('express');
const router = express.Router();

const authenticateJWT = require('../middleware/auth');
const requireNotRestricted = require('../middleware/requireNotRestricted');
const requireNotTransactionRestricted = require('../middleware/requireNotTransactionRestricted');

const {
  viewCardByPin,
  renameCard,
  blockCard,
  updateAtmLimit,
  updateTransferLimit,
  updatePurchaseLimit
} = require('../controllers/cardController');

const {
  getCurrentBalance,
  getAllTransactions,
  sendMoney
} = require('../controllers/transactionController');

const {
  getUserData,
  updateName,
  updateEmail,
  updatePhone,
  updatePassword,
  updatePin,
  deleteAccount
} = require('../controllers/userController');

router.use(authenticateJWT);


router.get('/card/view', viewCardByPin);
router.patch('/card/rename', requireNotRestricted, renameCard);
router.patch('/card/block/:id', requireNotRestricted, blockCard);
router.patch('/card/atm-limit', requireNotRestricted, updateAtmLimit);
router.patch('/card/transfer-limit', requireNotRestricted, updateTransferLimit);
router.patch('/card/purchase-limit', requireNotRestricted, updatePurchaseLimit);


router.get('/transaction/balance', getCurrentBalance);
router.get('/transaction/all', getAllTransactions);
router.post('/transaction/send', requireNotRestricted, requireNotTransactionRestricted, sendMoney);


router.get('/me', getUserData);
router.patch('/name', requireNotRestricted, updateName);
router.patch('/email', requireNotRestricted, updateEmail);
router.patch('/phone', requireNotRestricted, updatePhone);
router.patch('/password', requireNotRestricted, updatePassword);
router.patch('/pin', requireNotRestricted, updatePin);
router.delete('/delete', requireNotRestricted, deleteAccount);

module.exports = router;
