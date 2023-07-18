const express = require("express");
const router = express.Router();
const { createChat, getChats } = require("../controllers/chats");

//require auth
const requireAuth = require("../middleware/requireAuth");
router.use(requireAuth);

/* GET chat listings. */
// router.get("/", getChats);
router.post("/", createChat);
router.get('/:id', getChats)
module.exports = router;
