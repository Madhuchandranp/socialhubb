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
    post.commentCount += 1;
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
      { "comments._id": req.params.commentId }, 
      { $push: { "comments.$.replies": req.body } },
      { new: true } 
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
    res.status(200).json({comments: post.comments ,commentCount: post.comments.length });
  } catch (error) {
    console.log("Failed to get Comments", error);
  }
};


exports.getCommentReplies = async (req, res) => {
  try {
    const commentId = req.params.commentId;
    const post = await Post.findOne({ 'comments._id': commentId }, { 'comments.$': 1 });
    if (!post) {
      return res.status(404).json({ message: 'Comment not found' });
    }
    const comment = post.comments.id(commentId);
    res.status(200).json({ comment });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};


exports.deleteComment = async (req, res) => {
  console.log(req.params.commentId, "deleteComment");
  try {
    const post = await Post.findOneAndUpdate(
      { "comments._id": req.params.commentId }, // Find the post containing the comment
      { $pull: { comments: { _id: req.params.commentId } }, $inc: { commentCount: -1 } }, // Remove the comment
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
