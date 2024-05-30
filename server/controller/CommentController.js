const Post = require("../model/Post");

exports.createComment = async (req, res) => {
  console.log(req.body.id, "createComment");
  try {
    const _id = req.body.id;
    const post = await Post.findById(_id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const comment = {
      text: req.body.text,
      user: req.body.user,
    };
    post.comments.push(comment);
    await post.save();
    res.status(201).json({ message: "Comment added successfully", post: post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createReply = async (req, res) => {
  console.log(req.params.commentId, "createReply");
  try {
    const post = await Post.findOneAndUpdate(
      { "comments._id": req.params.commentId }, // Find the post containing the comment
      { $push: { "comments.$.replies": req.body } }, // Add the reply to the comment's replies array
      { new: true } // Return the updated post after modification
    );
    if (!post) {
      return res.status(404).json({ message: "Post or comment not found" });
    }
    res.status(201).json({ message: "Reply added successfully", post: post });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getComments = async (req, res) => {
  console.log(req.params.id,"comments");
  try {
    const post = await Post.findById(req.params.id);
    console.log(post)
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    res.status(200).json({comments: post.comments });
  } catch (error) {
    console.log("Failed to get Comments", error);
  }
};

exports.getCommentReplies = async (req, res) => {
  console.log(req.params.commentId, "getCommentReplies");
  try {
    const post = await Post.findOne(
      { "comments._id": req.params.commentId }, // Find the post containing the comment
      { "comments.$": 1 } // Project only the specific comment with its replies
    );
    if (!post) {
      return res.status(404).json({ message: "Post or comment not found" });
    }
    const comment = post.comments.id(req.params.commentId);
    res.status(200).json({ comment });
  } catch (error) {
    console.log("Failed to get Comment with Replies", error);
    res.status(500).json({ error: error.message });
  }
};


exports.deleteComment = async (req, res) => {
  console.log(req.params.commentId, "deleteComment");
  try {
    const post = await Post.findOneAndUpdate(
      { "comments._id": req.params.commentId }, // Find the post containing the comment
      { $pull: { comments: { _id: req.params.commentId } } }, // Remove the comment
      { new: true } // Return the updated post after modification
    );
    if (!post) {
      return res.status(404).json({ message: "Post or comment not found" });
    }
    res.status(200).json({ message: "Comment deleted successfully", post: post });
  } catch (error) {
    console.log("Failed to delete Comment", error);
    res.status(500).json({ error: error.message });
  }
};
