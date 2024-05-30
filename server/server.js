const express = require("express");
require("dotenv").config();
const connectDB = require("./config/db");
connectDB();
const cors = require("cors");
const app = express();
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/auth");
const postRoutes = require("./routes/post");
const mailRoutes = require("./routes/mail");
const commentRoutes = require("./routes/comment");
const adminRoutes = require("./routes/admin");

app.use(express.json());
app.use(express.static("public"));
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use("/auth", authRoutes);
app.use("/post", postRoutes);
app.use("/comment", commentRoutes);
app.use("/mail", mailRoutes);
app.use("/admin",adminRoutes);
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
