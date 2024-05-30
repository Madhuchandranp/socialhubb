import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminnavbar from "./Adminnavbar";
import { toast } from "react-toastify";
import "./adstyle.css";

export default function Users() {
   
    const [users, setUsers] = useState([]);

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get("http://localhost:5000/admin/Allusers");
          setUsers(response.data);
        } catch (error) {
          toast.error("Failed to fetch users");
          console.error(error);
        }
      };
  
      fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
          await axios.delete(`http://localhost:5000/admin/delete/${id}`);
          toast.success("User deleted successfully");
          setUsers(users.filter(user => user._id !== id));
        } catch (error) {
          toast.error("Failed to delete user");
          console.error(error);
        }
      };

    const banUser = async (id) => {
        try {
          await axios.put(`http://localhost:5000/admin/ban/${id}`);
          toast.success("User banned successfully");
          setUsers(users.map(user => user._id === id ? { ...user, banned: true } : user));
        } catch (error) {
          toast.error("Failed to ban user");
          console.error(error);
        }
      };
    
      const unbanUser = async (id) => {
        try {
          await axios.put(`http://localhost:5000/admin/unban/${id}`);
          toast.success("User unbanned successfully");
          setUsers(users.map(user => user._id === id ? { ...user, banned: false } : user));
        } catch (error) {
          toast.error("Failed to unban user");
          console.error(error);
        }
      };
  
    return (
     <div>
        <Adminnavbar />
         <div className="user-list">
        <h2>All Users</h2>
        {users.length > 0 ? (
           <ul>
          {users.map((user) => (
            <li key={user._id}>
              <strong>Username:</strong> {user.username} <br />
              <strong>Email:</strong> {user.email} <br />
              <strong>Status:</strong> {user.banned ? "Banned" : "Active"} <br />
              <button onClick={() => deleteUser(user._id)}>Delete</button>
              {user.banned ? (
                <button onClick={() => unbanUser(user._id)}>Unban</button>
              ) : (
                <button onClick={() => banUser(user._id)}>Ban</button>
              )}
              </li>
          ))}
        </ul>
        ) : (
          <p>No users found</p>
        )}
      </div></div>
    );
  }
  
 
