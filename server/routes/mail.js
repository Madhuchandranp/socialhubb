const express = require("express");
const router = express.Router();
const mailController= require("../controller/mailController");

// router.post("/sendmail",mailController.postEmail)
router.post("/sendmails",mailController.sendMail)

module.exports = router;
