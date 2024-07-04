import React, { useEffect, useState } from "react";
import Navbar from "../components/navbar";
import axios from "axios";
import "./Home.css";
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
  const [profileData, setProfileData] = useState({ followers: [], following: [] });
  const [likedPosts, setLikedPosts] = useState({});
  const user = JSON.parse(localStorage.getItem("user"));
  console.log("user",user);
  const nav = useNavigate();


  useEffect(() => {
    fetchData();
    fetchProfileData();
    const refreshInterval = setInterval(() => {
      fetchData();
      fetchProfileData();
    }, 2000);
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

  const fetchProfileData = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/auth/profile/${user.user.userId}`);
      setProfileData(response.data);
    } catch (err) {
      console.error(err);
    }
  };


  // const handleLike = async (postId) => {
  //   try {
  //     const response = await axios.post(`http://localhost:5000/post/`, { postId });
  //     setBannerData((prevData) =>
  //       prevData.map((post) =>
  //         post._id === postId ? { ...post, likes: response.data.likes } : post
  //       )
  //     );
  //     toast.success("Post liked");
  //   } catch (error) {
  //     console.error(error);like
  //     toast.error("Failed to like post");
  //   }
  // };

  const handleLike = async (postId) => {
    try {
      const response = await axios.post("http://localhost:5000/post/like", {
        postId,
        userId: user.user.userId,
      });
      setLikedPosts((prevLikedPosts) => ({
        ...prevLikedPosts,
        [postId]: !prevLikedPosts[postId],
      }));
      setBannerData((prevData) =>
        prevData.map((post) =>
          post._id === postId ? { ...post, likes: response.data.likes } : post
        )
      );
      toast.success("Post liked");
    } catch (error) {
      console.error("Error liking post:", error);
      toast.error("Failed to like post");
    }
  };

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
  const handleFollow = async (followId) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/follow", { userId: user.user._id, followId });
      toast.success(response.data.message);
      fetchProfileData();
    } catch (error) {
      console.error("Failed to follow user", error);
      toast.error("Failed to follow user");
    }
  };

  const handleUnfollow = async (followId) => {
    try {
      const response = await axios.post("http://localhost:5000/auth/unfollow", { userId: user.user._id, followId });
      toast.success(response.data.message);
      fetchProfileData();
    } catch (error) {
      console.error("Failed to unfollow user", error);
      toast.error("Failed to unfollow user");
    }
  };

  const isFollowing = (postOwnerId) => {
    return profileData.following.includes(postOwnerId);
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
                  <img src={avatar} alt="avatar" className="pro_imgs" />
                  Posted by {post.name}
                </label>
              </div>
              <div>
                <Checkbox size="50px" style={{ fontSize: "30px", color: "gray" }} icon={<MoreVertIcon />} />

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
              <Checkbox size="50px" style={{ fontSize: "30px", color: "gray" }} icon={<FavoriteBorderIcon />}
                checkedIcon={<Favorite sx={{ color: "red" }} />}
                checked={likedPosts[post._id]} onChange={() => handleLike(post._id)} />
              <span>{post.likes}</span>

              <div>
                <Checkbox style={{ fontSize: "30px", color: "gray" }} icon={<ChatBubbleOutlineIcon />} className="comment-icon"
                  onClick={() => nav(`/post/${post._id}`, { replace: true })} checkedIcon={<ChatBubbleIcon />} />
                <span className="comment-count">{post.commentCount}</span>
              </div>
              <Checkbox style={{ fontSize: "30px", color: "gray" }} icon={<SendIcon />} className="comment-icon"
                onClick={() => nav(`/Mailsend`, { replace: true })} />

              <button onClick={() => reportPost(post._id)}>Report </button>
              {isFollowing(post.user) ? (
                <button className="follow-button" onClick={() => handleUnfollow(post.user)}>
                  Unfollow
                </button>
              ) : (
                <button className="follow-button" onClick={() => handleFollow(post.user)}>
                  Follow
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}


// import React, { useEffect, useState } from "react";
// import Navbar from "../components/navbar";
// import axios from "axios";
// import "./Home.css";
// import { useNavigate } from "react-router-dom";
// import Checkbox from '@mui/material/Checkbox';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import Favorite from '@mui/icons-material/Favorite';
// import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
// import ChatBubbleIcon from '@mui/icons-material/ChatBubble';
// import SendIcon from '@mui/icons-material/Send';
// import avatar from '../pages/assets/profile.jpeg';
// import MoreVertIcon from '@mui/icons-material/MoreVert';
// import { toast } from "react-toastify";

// export default function Home() {
//   const [postData, setPostData] = useState([]);
//   const imagePath = "http://localhost:5000/files/";
//   const [profileData, setProfileData] = useState({ followers: [], following: [] });
//   const user = JSON.parse(localStorage.getItem("user"));
//   const nav = useNavigate();

//   useEffect(() => {
//     fetchData();
//     fetchProfileData();
//     const refreshInterval = setInterval(() => {
//       fetchData();
//       fetchProfileData();
//     }, 2000);
//     return () => clearInterval(refreshInterval);
//   }, []);

//   const fetchData = () => {
//     axios
//       .get("http://localhost:5000/post/get")
//       .then((res) => {
//         setPostData(res.data);
//       })
//       .catch((err) => console.log(err));
//   };

//   const fetchProfileData = async () => {
//     try {
//       const response = await axios.get(`http://localhost:5000/auth/profile/${user.user._id}`);
//       setProfileData(response.data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // const handleLike = async (postId) => {
//   //   try {
//   //     const response = await axios.post(`http://localhost:5000/post/like`, { postId, userId: user.user._id });
//   //     setPostData((prevData) =>
//   //       prevData.map((post) =>
//   //         post._id === postId ? { ...post, likes: response.data.likes, likedBy: response.data.likedBy } : post
//   //       )
//   //     );
//   //     toast.success("Post like status updated");
//   //   } catch (error) {
//   //     console.error(error);
//   //     toast.error("Failed to like post");
//   //   }
//   // };



//   const reportPost = async (postId) => {
//     try {
//       const response = await axios.post("http://localhost:5000/post/report", { postId });
//       toast.success(response.data.message);
//       setPostData((prevData) =>
//         prevData.map((post) =>
//           post._id === postId ? { ...post, reports: post.reports + 1 } : post
//         )
//       );
//     } catch (error) {
//       toast.error("Failed to report post");
//       console.error(error);
//     }
//   };

//   const handleFollow = async (followId) => {
//     try {
//       const response = await axios.post("http://localhost:5000/auth/follow", { userId: user.user._id, followId });
//       toast.success(response.data.message);
//       fetchProfileData();
//     } catch (error) {
//       console.error("Failed to follow user", error);
//       toast.error("Failed to follow user");
//     }
//   };

//   const handleUnfollow = async (followId) => {
//     try {
//       const response = await axios.post("http://localhost:5000/auth/unfollow", { userId: user.user._id, followId });
//       toast.success(response.data.message);
//       fetchProfileData();
//     } catch (error) {
//       console.error("Failed to unfollow user", error);
//       toast.error("Failed to unfollow user");
//     }
//   };

//   const isFollowing = (postOwnerId) => {
//     return profileData.following.includes(postOwnerId);
//   };

//   return (
//     <div>
//       <Navbar />
//       <div className="container">
//         {postData.map((post, index) => (
//           <div key={index} className="post-container">
//             <div className="post-header">
//               <div className="post-title">
//                 <label className="pro">
//                   <img src={avatar} alt="avatar" className="pro_imgs" />
//                   Posted by {post.name}
//                 </label>
//               </div>
//               <div>
//                 <Checkbox size="50px" style={{ fontSize: "30px", color: "gray" }} icon={<MoreVertIcon />} />
//               </div>
//             </div>
//             <img
//               className="post-image"
//               src={`${imagePath}${post.image}`}
//               alt={post.name}
//             />
//             <div className="text-center text-white animate-pulse">
//               {post.description}
//             </div>
//             <div className="">
//               <Checkbox
//                 size="50px"
//                 style={{ fontSize: "30px", color: "gray" }}
//                 icon={<FavoriteBorderIcon />}
//                 checkedIcon={<Favorite sx={{ color: "red" }} />}
//                 checked={post.likedBy && post.likedBy.includes(user.user._id)}
//                 onChange={() => handleLike(post._id)}
//               />

//               <span>{post.likes}</span>
              
//               <div>
//                 <Checkbox
//                   style={{ fontSize: "30px", color: "gray" }}
//                   icon={<ChatBubbleOutlineIcon />}
//                   className="comment-icon"
//                   onClick={() => nav(`/post/${post._id}`, { replace: true })}
//                   checkedIcon={<ChatBubbleIcon />}
//                 />
//                 <span className="comment-count">{post.commentCount}</span>
//               </div>
//               <Checkbox
//                 style={{ fontSize: "30px", color: "gray" }}
//                 icon={<SendIcon />}
//                 className="comment-icon"
//                 onClick={() => nav(`/Mailsend`, { replace: true })}
//               />
//               <button onClick={() => reportPost(post._id)}>Report </button>
//               {isFollowing(post.user) ? (
//                 <button className="follow-button" onClick={() => handleUnfollow(post.user)}>
//                   Unfollow
//                 </button>
//               ) : (
//                 <button className="follow-button" onClick={() => handleFollow(post.user)}>
//                   Follow
//                 </button>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

