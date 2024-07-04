
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Post = require("../model/Post"); // Ensure the correct path
const Like= require("../model/Like");
const User=require("../model/User")

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    fs.mkdirSync("public/files", { recursive: true });
    cb(null, "public/files");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp|gif|mp4|avi|mkv)$/)) {
      req.fileValidationError = "Only image files are allowed!";
      return cb(new Error("Only image files are allowed!"), false);
    }
    cb(null, true);
  },
});

exports.uploadPost = upload.single("photo");

exports.createPost = (req, res) => {
  console.log("Post create called");
  const { name, description } = req.body;
  const image = req.file.filename;
  console.log(name, image, description);
  const post = new Post({ name, image, description });
  post
    .save()
    .then(() => res.json("Post added!"))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.getPosts = (req, res) => {
  console.log("Get all posts called");
  Post.find()
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.getCurrentUserPosts = (req, res) => {
  console.log("Current user Post get called");
  const { user } = req.body;
  console.log(user);
  Post.find({ name: user })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.getSelectedPosts = (req, res) => {
  const { id } = req.body;
  Post.findById(id)
    .then((post) => res.json(post))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.deletePosts = async (req, res) => {
  console.log("Post delete called");
  const { id, imageName } = req.body;
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const filePath = `public/files/${imageName}`;
    if (fs.existsSync(filePath)) {
      fs.unlink(filePath, (err) => {
        if (err) throw err;
        console.log(`${filePath} was deleted`);
      });
    }
    res.status(200).json({ passed: true });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "An error occurred" });
  }
};


// exports.likePost = async (req, res) => {
//   console.log("Post like/unlike called");
//   const { postId, userId } = req.body;

//   try {
//     const post = await Post.findById(postId);
//     if (!post) {
//       return res.status(404).json({ message: "Post not found" });
//     }

//     const userIndex = post.likedBy.indexOf(userId);

//     if (userIndex === -1) {
//       post.likes += 1;
//       post.likedBy.push(userId);
//     } else {
//       post.likes -= 1;
//       post.likedBy.splice(userIndex, 1);
//     }

//     await post.save();
//     res.status(200).json({ message: 'Post like status updated', likes: post.likes });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "An error occurred" });
//   }
// };
exports.likePost = async (req, res) => {
  const { postId, userId } = req.body;
  try {
    const post = await Post.findById(postId);
    const likeUser=await User.findOne({_id:userId});
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const existingLike = await Like.findOne({ user: userId, post: postId });
    if (!existingLike) {
      const newLike = new Like({ user: userId, post: postId });
      await newLike.save();
      post.likesList.push(newLike._id);
      // post.likes += 1;
      post.likes=post.likesList.length
      post.likedBy.push(likeUser._id)
    } else {
      await Like.findByIdAndDelete(existingLike._id);
      post.likes -= 1;
      post.likesList = post.likesList.filter(
        (likeId) => likeId.toString() !== existingLike._id.toString()
      );
    }
    await post.save();
    res.status(200).json({ message: "Post like status updated", likes: post.likes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.reportPost = async (req, res) => {
  console.log("Post report called");
  const { postId, userId } = req.body; // userId should be included in the request

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    if (post.reportedBy.includes(userId)) {
      return res.status(400).json({ message: "You have already reported this post" });
    }
    post.reportedBy.push(userId);
    post.reports = post.reportedBy.length;
    if (post.reports >= 2) {
      const filePath = `public/files/${post.image}`;
      await Post.findByIdAndDelete(postId);
      if (fs.existsSync(filePath)) {
        fs.unlink(filePath, (err) => {
          if (err) {
            console.error(`Error deleting file: ${filePath}`, err);
          } else {
            console.log(`${filePath} was deleted`);
          }
        });
      }
      return res.status(200).json({ message: "Post deleted due to multiple reports" });
    }
    await post.save();
    res.status(200).json({ message: 'Post reported', reports: post.reports });
  } catch (err) {
    console.error("Error reporting post:", err);
    res.status(500).json({ error: "An error occurred" });
  }
};
