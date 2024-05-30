/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CommentContainer from "../components/comment";
import Navbar from "../components/navbar";

export default function ViewPost() {
  const { id } = useParams();
  const [postData, setBannerData] = useState([]);
  const imagePath = "http://localhost:5000/files/";

  useEffect(() => {
    fetchData();
    const refreshInterval = setInterval(fetchData, 2000);
    // Clean up interval on component unmount
    return () => clearInterval(refreshInterval);
  }, []);

  function fetchData() {
    axios
      .post("http://localhost:5000/post/selected/get", {
        id,
      })
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
      <Navbar />
      {/* posts */}
      <div className="">
        <h3 className="my-post">My Posts</h3>
        <div className="">
          <div className="container">
            <div className="post-container">
              <div className="post-header">
                <div className="post-title">Posted by {postData.name}</div>
                <button className="like-button" onClick={() => handleLike()}>
                  Like
                </button>
              </div>
              <img
                className="post-image"
                src={`${imagePath}${postData.image}`}
                alt={postData.name}
              />
              <div className="text-center text-white animate-pulse">
                {postData.description}
              </div>
            </div>
          </div>
        </div>
        <div className="">
          <CommentContainer id={id} />
        </div>
      </div>
    </div>
  );
}
