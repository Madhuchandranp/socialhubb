const express = require('express');
const router = express.Router();
const adminController = require('../controller/adminController');

// router.post('/liked', adminController.getLikedPosts); // Add this line for getting liked posts

router.post("/adminsignup", adminController.adminsignup);
router.post("/adminlogin", adminController.adminlogin);
router.get("/Allusers", adminController.getAllUsers); 
router.delete("/delete/:id", adminController.deleteUser); 
router.put("/ban/:id", adminController.banUser);     
router.put("/unban/:id", adminController.unbanUser); 
router.get('/reported', adminController.getReportedPosts);

module.exports = router;
