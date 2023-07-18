const express = require("express");
const router = express.Router();

const { getOtherUsers } = require("../controllers/users");

//require auth
const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

/* GET users listing. */
router.get("/:id", getOtherUsers);

module.exports = router;