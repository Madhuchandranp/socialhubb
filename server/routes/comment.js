const express = require("express");
const router = express.Router({ mergeParams: true });
const CommentController = require("../controller/CommentController");
// comment
router.route("/").post(CommentController.createComment);
router.route("/:id").get(CommentController.getComments);
router.post("/comment/:commentId/reply", CommentController.createReply);
router.get("/comment/:commentId/replies", CommentController.getCommentReplies);
router.delete("/comment/:commentId", CommentController.deleteComment); // Add this line

module.exports = router;
