import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import "./Home.css"; // Import your CSS file for styling
// import { FaComment } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
import SendIcon from '@mui/icons-material/Send';
import avatar from '../pages/assets/profile.jpeg'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { toast } from "react-toastify";

export default function Home() {
  const [postData, setBannerData] = useState([]);
  const imagePath = "http://localhost:5000/files/";
  const [likedPosts, setLikedPosts] = useState({});

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

  // const handleLike = (postId) => {
  //   setLikedPosts((prevLikedPosts) => ({
  //     ...prevLikedPosts,
  //     [postId]: !prevLikedPosts[postId],
  //   }));
  
  //   // Optionally, send the like status to the backend
  //   axios.post(`http://localhost:5000/post/like`, { postId })
  //     .then((res) => {
  //       console.log(`Post ${postId} liked`);
  //     })
  //     .catch((err) => console.error(err));
  // };
  
  const reportPost = async (postId) => {
    try {
      const response = await axios.post("http://localhost:5000/post/report", { postId });
      toast.success(response.data.message);
      setBannerData(postData.map(post => post._id === postId ? { ...post, reports: post.reports + 1 } : post));
    } catch (error) {
      toast.error("Failed to report post");
      console.error(error);
    }
  };


  return (
    <div>
      <Navbar />
      <div className="container">
        {postData.map((post, index) => (
          <div key={index} className="post-container">
            <div className="post-header">
              
            <div className="post-title">
                   <label className="pro">
          <img src={avatar} alt="avatar" className="pro_imgs"/>
          Posted by {post.name}  
         </label> 
          </div>
          <div>
          <Checkbox size="50px" style={{ fontSize: "30px", color: "gray" }} icon={<MoreVertIcon />}  />
          
</div>
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
                onClick={() => nav(`/Mailsend`, { replace: true }) }/>
                        
                           <button onClick={() => reportPost(post._id)}>Report Post</button>

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
