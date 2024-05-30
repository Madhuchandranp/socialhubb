import React from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
function Navbar() {
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
            <CiUser /> Profile
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
