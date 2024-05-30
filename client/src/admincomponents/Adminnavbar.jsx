import React from "react";
import "../components/navbar/Navbar.css";
import { Link } from "react-router-dom";
import { CiUser } from "react-icons/ci";
function Adminnavbar() {
  return (
    <nav className="navbar">
      <span className="logo">Social Pics</span>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to="/Adminhome">Home</Link>
        </li>

          <li className="nav-item">
          <Link to="/Reports">
            <CiUser />  Reports
          </Link>
        </li>
        {/* <li className="nav-item">
          <Link to="/profile">
            <CiUser /> users
          </Link> */}
        {/* </li> */}
      </ul>
    </nav>
  );
}

export default Adminnavbar;
