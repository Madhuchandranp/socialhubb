// routes/auth.js
const express = require("express");
const router = express.Router();
const postController = require("../controller/imageController");

router.post("/create", postController.uploadPost, postController.createPost);
router.get("/get", postController.getPosts);
router.post("/currentuser/get", postController.getCurrentUserPosts);
router.post("/selected/get", postController.getSelectedPosts);
router.post("/delete/:postId", postController.deletePosts);
router.post('/like', postController.likePost);
// router.post('/unlike', postController.unlikePost);
router.post("/report", postController.reportPost);
// router.get('/notifications',postController.getNotifications);

module.exports = router;
