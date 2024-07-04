// routes/auth.js
const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.post("/signup", authController.signup)
router.post("/login", authController.login);
// router.post('/request-reset-password',authController.requestResetPassword);
// router.post('/reset-password/:token', authController.resetPassword);
router.post('/follow',authController.followUser);
router.post('/unfollow', authController.unfollowUser)


module.exports = router;
