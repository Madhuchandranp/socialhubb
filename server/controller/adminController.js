
const User = require("../model/User");
const bcrypt = require("bcrypt");
const Admin = require("../model/admin")

exports.adminsignup = async (req, res) => {
  console.log("called");
  const { username, email, password } = req.body;
  const existing = await Admin.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "admin already exists" });
  }
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

   try {
    const newAdmin = await Admin.create({ username, email, password: hashedPassword });
    res.status(200).json({ message: "Admin created successfully", admin: newAdmin });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.adminlogin = async (req, res) => {
  const { email, password } = req.body;
  console.log(email, password);
  const admin = await Admin.findOne({ email });
  if (!admin) {
    return res.status(400).json({ message: "Invalid email or password" });
  }
  const isMatch = await bcrypt.compare(password, admin.password);
  if (!isMatch) {
    return res.status(400).json({ message: "Invalid email or password" });
  }

  res.status(200).json({
    message: "Logged in successfully",
    admin: { email, username: admin.username },
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
