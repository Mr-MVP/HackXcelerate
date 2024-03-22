const router = require('express').Router();
const postRoutes = require('./post');
const accountRoutes = require('./account');
const modelRoutes = require('./ML');


router.use("/post", postRoutes);

router.use("/account", accountRoutes);

router.use("/models", modelRoutes);

module.exports = router;