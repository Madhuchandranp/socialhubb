// const express = require('express');
// const router = express.Router();
// const Post = require('../models/admin');

// // Handler for getting liked posts by the current user
// exports.getLikedPosts = async (req, res) => {
//   console.log("Get liked posts called");
//   const { userId } = req.body; // Assuming userId is passed in the request body

//   try {
//     const likedPosts = await Post.find({ likes: userId });
//     res.status(200).json(likedPosts);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: "An error occurred" });
//   }
// };

// module.exports = router;
// controllers/authController.js
const User = require("../model/User");
const bcrypt = require("bcrypt");

exports.adminsignup = async (req, res) => {
  console.log("called");
  const { username, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "User already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

   try {
    const newUser = await User.create({ username, email, password: hashedPassword });
    res.status(200).json({ message: "User created successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.adminlogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  res.status(200).json({
    message: "Logged in successfully",
    user: { email, username: user.username },
  });
};

exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find({}, { password: 0 }); // Exclude password from the response
      res.status(200).json(users);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.deleteUser = async (req, res) => {
    try {
      const user = await User.findByIdAndDelete(req.params.id);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.banUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { banned: true }, { new: true });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User banned successfully", user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  
  // New function to unban a user
  exports.unbanUser = async (req, res) => {
    try {
      const user = await User.findByIdAndUpdate(req.params.id, { banned: false }, { new: true });
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User unbanned successfully", user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  exports.getReportedPosts = async (req, res) => {
    try {
      const reportedPosts = await Post.find({ reports: { $gt: 0 } }); // Find posts with report count greater than 0
      res.status(200).json(reportedPosts);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred" });
    }
  };
