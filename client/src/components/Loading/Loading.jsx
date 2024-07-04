// src/Loading.js
import React from 'react';
import './Loading.css'; // Ensure to create corresponding CSS
import loadingImg from "../Loading/intro.mp4";

const Loading = () => {
  return (
    <div className="loading-container"   style={{backgroundColor:"black" }}>
      {/* <img src={loadingImg} alt="Loading..." className="loading-logo"/> */}
      <video className="loading-video" autoPlay loop muted>
        <source src={loadingImg} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
        </div>
  );
};

export default Loading;
