// controllers/authController.js
const User = require("../model/User");
const bcrypt = require("bcrypt");
const crypto = require("crypto");

// const { sendMail } = require("../controller/mailController");

exports.signup = async (req, res) => {
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

exports.login = async (req, res) => {
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
    user: { email, username: user.username ,userId:user._id},
  });
};
// exports.requestResetPassword = async (req, res) => {
//   try {
//     const { email } = req.body;
//     const user = await User.findOne({ email });

//     if (!user) {
//       return res.status(404).json({ message: 'User not found' });
//     }

//     // Generate a reset token
//     const token = crypto.randomBytes(32).toString('hex');
//     const hashedToken = await bcrypt.hash(token, 10);

//     // Save the hashed token and its expiration to the user's document
//     user.resetPasswordToken = hashedToken;
//     user.resetPasswordExpires = Date.now() + 3600000; // 1 hour from now

//     await user.save();

//     // Compose email content
//     const mailOptions = {
//       from: 'amalanu0012@gmail.com',
//       to: email,
//       subject: 'Password Reset',
//       text: `
//         You have requested to reset your password. Please click the link below to reset your password:
//         http://localhost:3000/reset-password/${token}

//         If you did not request this, please ignore this email.

//         Best regards,
//         Your Name
//       `
//     };

//     await sendMail(mailOptions);
//     res.status(200).json({ message: 'Password reset email sent successfully' });
//   } catch (error) {
//     console.error('Error sending password reset email:', error);
//     res.status(500).json({ error: 'Failed to send password reset email' });
//   }
// };

// exports.resetPassword = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { newPassword } = req.body;

//     // Find the user with the corresponding token and check its expiration
//     const user = await User.findOne({
//       resetPasswordToken: { $exists: true },
//       resetPasswordExpires: { $gt: Date.now() }
//     });

//     if (!user) {
//       return res.status(400).json({ message: 'Invalid or expired token' });
//     }

//     // Verify the token
//     const isTokenValid = await bcrypt.compare(token, user.resetPasswordToken);

//     if (!isTokenValid) {
//       return res.status(400).json({ message: 'Invalid or expired token' });
//     }

//     // Hash the new password and save it to the user's document
//     user.password = await bcrypt.hash(newPassword, 10);
//     user.resetPasswordToken = undefined;
//     user.resetPasswordExpires = undefined;

//     await user.save();

//     res.status(200).json({ message: 'Password reset successfully' });
//   } catch (error) {
//     console.error('Error resetting password:', error);
//     res.status(500).json({ error: 'Failed to reset password' });
//   }
// };
exports.followUser = async (req, res) => {
  try {
    const { userId, followId } = req.body;

    // Add followId to the user's following list
    await User.findByIdAndUpdate(userId, { $addToSet: { following: followId } });

    // Add userId to the followId's followers list
    await User.findByIdAndUpdate(followId, { $addToSet: { followers: userId } });

    res.status(200).json({ message: 'Followed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to follow user', error });
  }
};

exports.unfollowUser = async (req, res) => {
  try {
    const { userId, followId } = req.body;

    // Remove followId from the user's following list
    await User.findByIdAndUpdate(userId, { $pull: { following: followId } });

    // Remove userId from the followId's followers list
    await User.findByIdAndUpdate(followId, { $pull: { followers: userId } });

    res.status(200).json({ message: 'Unfollowed successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to unfollow user', error });
  }
};