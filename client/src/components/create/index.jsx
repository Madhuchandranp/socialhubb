import axios from "axios";
import React, { useState } from "react";
import { toast } from "react-toastify";
import "./CreatePost.css";
import Navbar from "../navbar";

export default function CreatePost() {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.user.username;
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  
  const handleUpload = () => {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("name", username);
    formData.append("description", description);

    axios
      .post("http://localhost:5000/post/create", formData)
      .then((res) => {
        toast.success("post created successfully!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
      })
      .catch((err) => console.log(err));
  };

  
  return (
   <div className="">
    <Navbar/>
     <div className="parent">
      
      <div className="create-post">
        <input
          className="create-post-input"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          type="text"
          placeholder="description"
        />
        <input
          className="create-post-file"
          onChange={(e) => setPhoto(e.target.files[0])}
          type="file"
          placeholder="Add file"
        />

        <button className="create-post-button" onClick={handleUpload}>
          Submit
        </button>
      </div>
    </div>
   </div>
  );
}
