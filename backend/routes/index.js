const router = require('express').Router();
const postRoutes = require('./post');
const accountRoutes = require('./account');
const modelRoutes = require('./ML');
const pinataRoutes = require('./pinata');

router.use("/post", postRoutes);

router.use("/account", accountRoutes);

router.use("/models", modelRoutes);

router.use("/pinata", pinataRoutes);

module.exports = router;