const express = require('express');
const router = express.Router();

// Import controller functions (you'll define these next)
const {
  createUser,
  addMoney,
  subtractMoney,
  getBalance,
} = require('../controllers/userControllers');

// Define routes
router.post('/create', createUser);
router.post('/add', addMoney);
router.post('/subtract', subtractMoney);
router.get('/balance/:emailId', getBalance);


module.exports = router;
