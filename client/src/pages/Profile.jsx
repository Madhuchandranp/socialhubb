/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
import { toast } from "react-toastify";


const Profile = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const nav = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    nav("/login");
  };
  function handleCreatePost() {
    nav("/createpost");
  }
  const [postData, setPostData] = useState([]);
  const [profileData, setProfileData] = useState({ followers: [], following: [] });
  const imagePath = "http://localhost:5000/files/";

  useEffect(() => {
    fetchData();
    fetchProfileData();
    const refreshInterval = setInterval(fetchData, 2000);
    return () => clearInterval(refreshInterval);
  }, []);

  const fetchData=()=> {
    axios
      .post("http://localhost:5000/post/currentuser/get", {
        user: user.user.username,
      })

      .then((res) => {
        setPostData(res.data);
      })
      .catch((err) => console.log(err));
  }

  const fetchProfileData = () => {
    axios
      .get(`http://localhost:5000/auth/profile/${user.user._id}`)
      .then((res) => setProfileData(res.data))
      .catch((err) => console.log(err));
  };


  const handleDeletePost = async (postId, imageName) => {
    try {
      await axios.post("http://localhost:5000/post/delete/:postId", { id: postId, name: imageName });
      toast.success("Post deleted successfully");
      fetchData(); 
    } catch (error) {
      console.error("Failed to delete post", error);
      toast.error("Failed to delete post");
    }
  };

 

  return (
    <div className="">
      <Navbar />
      <div className="profile-container">
        <div className="profile-content">
          <h1 className="">Profile</h1>
          <div className="profile-info">
            <p>
              <span className="key-name">Username:</span> {user.user.username}
            </p>
            <p>
              <span className="key-name">Email:</span> {user.user.email}
            </p>
            <p>
              <span className="key-name">Followers:</span> {profileData.followers.length}
            </p>
            <p>
              <span className="key-name">Following:</span> {profileData.following.length}
            </p>
          </div>
          <div className="options">
            <button className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
            <button className="create-btn" onClick={handleCreatePost}>
              Create Post
            </button>
          </div>
        </div>
      </div>
      {/* posts */}
      <div className="">
        <h3 className="my-post">My Posts</h3>
        <div className="">
          <div className="container">
            {postData.map((post, index) => (
              <div key={index} className="post-container">
                <div className="post-header">
                  <div className="post-title">Posted by {post.name}</div>

                  <button
                    className="delete-button"
                    onClick={() => handleDeletePost(post._id, post.image)}>Delete
                  </button>
                </div>
                <img
                  className="post-image"
                  src={`${imagePath}${post.image}`}
                  alt={post.name}
                />
                <div className="text-center text-white animate-pulse">
                  {post.description}
                </div>
                <div className="">
                  <Checkbox size="50px" style={{ fontSize: "30px", color: "gray" }} icon={<FavoriteBorderIcon />} checkedIcon={<Favorite sx={{ color: "red" }} />} />

                  <Checkbox style={{ fontSize: "30px", color: "gray" }} icon={<ChatBubbleOutlineIcon />} className="comment-icon"
                    onClick={() => nav(`/post/${post._id}`, { replace: true })} checkedIcon={<ChatBubbleIcon />} />

                  <Checkbox style={{ fontSize: "30px", color: "gray" }} icon={<SendIcon />} className="comment-icon"
                    onClick={() => nav(`/Mailsend`, { replace: true })} checkedIcon={<ChatBubbleIcon />} />
                
               
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
