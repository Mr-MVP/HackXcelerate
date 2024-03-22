const express = require('express');
const postController  = require('../controllers/postController');
const router = express.Router();

router.route('/create').post(postController.createPost);

module.exports = router;