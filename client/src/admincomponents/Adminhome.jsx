import React, { useEffect, useState } from "react";
import axios from "axios";
import "../pages/Home.css"; // Import your CSS file for styling
import { useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
import Adminnavbar from "./Adminnavbar";

export default function Adminhome() {
  const [postData, setBannerData] = useState([]);
  const imagePath = "http://localhost:5000/files/";
  const nav = useNavigate();

  useEffect(() => {
    fetchData();
    const refreshInterval = setInterval(fetchData, 2000);
    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, []);

  function fetchData() {
    axios
      .get("http://localhost:5000/post/get")
      .then((res) => {
        setBannerData(res.data);
      })
      .catch((err) => console.log(err));
  }

  const handleLike = (index) => {
    // You can implement your like functionality here
    console.log(`Liked post ${index}`);
  };

  return (
    <div>
      <Adminnavbar />
      <div className="container">
        {postData.map((post, index) => (
          <div key={index} className="post-container">
            <div className="post-header">
              <div className="post-title">Posted by {post.name}</div>
              <button className="like-button" onClick={() => handleLike(index)}>
                Like
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

              <Checkbox style={{ fontSize: "30px", color: "gray" }} icon={<ChatBubbleOutlineIcon/>}className="comment-icon"
                onClick={() => nav(`/post/${post._id}`, { replace: true }) }checkedIcon={<ChatBubbleIcon  />}/>
            
               <Checkbox style={{ fontSize: "30px", color: "gray" }} icon={<SendIcon />}className="comment-icon"
                onClick={() => nav(`/Mailsend`, { replace: true }) }checkedIcon={<ChatBubbleIcon  />}/>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
