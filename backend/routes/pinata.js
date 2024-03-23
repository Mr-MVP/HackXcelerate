const router = require("express").Router();
const {pinata} = require("../controllers/pinataController");
router.route("/").post(pinata);

module.exports = router;