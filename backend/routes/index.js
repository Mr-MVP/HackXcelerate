const router = require('express').Router();
const postRoutes = require('./post');
const accountRoutes = require('./account');

router.use("/post", postRoutes);

router.use("/account", accountRoutes);


module.exports = router;