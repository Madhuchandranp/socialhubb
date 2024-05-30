// PasswordStep.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function Password({ username, email }) {
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password) {
      if (password.length < 8) {
        toast.error("Please choose a longer password, minimum length 8");
        console.log("Password should be at least 8 characters long");
      } else {
        try {
          const response = await axios.post("http://localhost:5000/auth/signup", {
            username,
            email,
            password,
          });
          nav("/login");
          console.log(response.data);
        } catch (error) {
          toast.error(error.response.data.message);
          console.error(error);
        }
      }
    } else {
      console.log("Please fill all fields");
    }
  };

  return (
    <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
      <div className="back">
        <form onSubmit={handleSubmit}>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button type="submit">Signup</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Password;
