const router = require('express').Router();
const {predImage, predText} = require('../controllers/MLController');

router.route('/text').post(predText);

router.route('/image').post(predImage);

module.exports = router;