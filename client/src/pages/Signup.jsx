// Signup.js
import React, { useState } from "react";
import "./style.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import avatar from '../pages/assets/profile.jpeg'

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (username && email && password) {
      if (password.length < 8) {
        toast.error("Please choose a longer password , minimum length 8");
        console.log("Password should be at least 8 characters long");
      } else {
        try {
          const response = await axios.post(
            "http://localhost:5000/auth/signup",
            {
              username,
              email,
              password,
            }
          );
          toast.success("User created successfully");
          navigate("/Login");
          console.log(response.data);
        } catch (error) {
          toast.error(error.response.data.message);
          console.error(error);
        }
      }
    } else {
      toast.error("Please fill all fields");
      console.log("Please fill all fields");
    }
  };

  return (
   
    
   <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <div className="back">

      <form  onSubmit={handleSubmit}>
        <div className="profile flex justify-center py-4 ">
         <label className="pro">
          <img src={avatar} alt="avatar" className="pro_img"/>
         </label> 
          </div>

      
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
        <span className="auth-options">
          Already have an account? <Link to="/Login">Login</Link>
        </span>
      </form>
    </div>
    </div> 
  );
}

export default Signup;
