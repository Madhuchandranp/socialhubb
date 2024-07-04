import React,{ useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";

function Navbar() {
  const [profileImage, setProfileImage] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user && user.profileImage) {
      setProfileImage(`http://localhost:5000/public/profile_images/${user.profileImage}`);
    }
  }, []);
  return (
    <nav className="navbar">
      <span className="logo">Social Pics</span>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/">Home</Link>
        </li>

        <li> <Link to="/Adminsignup">
            <CiUser /> Admin
          </Link></li>
          <li className="nav-item">
          <Link to="/profile">
            {profileImage ? (
              <img src={profileImage} alt="Profile" className="profile-image" />
            ) : (
              <CiUser />
            )}
            Profile
          </Link>
        </li>

      </ul>
    </nav>
  );
}

export default Navbar;
