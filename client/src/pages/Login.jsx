// Login.js
import React, { useState } from "react";
import "../pages/style.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (email && password) {
      try {
        const response = await axios.post("http://localhost:5000/auth/login", {
          email,
          password,
        });

        console.log(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        toast.success(response.data.message);
        nav("/home");
      } catch (error) {
        console.error(error);
        toast.error("Invalid credentials");
      }
    } else {
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
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
        <span className="auth-options">New User? <Link to="/signup">Signup</Link></span>
      </form>
    </div>
  );
}

export default Login;
