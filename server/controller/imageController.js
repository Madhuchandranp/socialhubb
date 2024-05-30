const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Post = require("../model/Post");

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
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|webp)$/)) {
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
  console.log("Post get called");
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

  Post.findOne({ _id: id })
    .then((posts) => res.json(posts))
    .catch((err) => res.status(400).json("Error: " + err));
};

exports.deletePosts = async (req, res) => {
  console.log("Post delete called");
  const { id, imageName } = req.body; // Changed to imageName for clarity
  try {
    const post = await Post.findByIdAndDelete(id);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const filePath = `public/files/${imageName}`; // Use imageName instead of name
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

exports.likePost = async (req, res) => {
  console.log("Post like called");
  const { postId } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.likes = post.likes || 0;
    post.likes += 1;

    await post.save();
    res.status(200).json({ message: 'Post liked', likes: post.likes });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
};

exports.reportPost = async (req, res) => {
  console.log("Post report called");
  const { postId } = req.body;

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    post.reports = post.reports || 0;
    post.reports += 1;

    await post.save();
    res.status(200).json({ message: 'Post reported', reports: post.reports });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "An error occurred" });
  }
};