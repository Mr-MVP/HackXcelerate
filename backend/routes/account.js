const router = require('express').Router();

const accountController = require('../controllers/accountController');

router.route('/create').post(accountController.createAccount);

module.exports = router;