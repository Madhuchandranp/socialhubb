import React, { useEffect, useState } from "react";
import axios from "axios";
import Adminnavbar from "./Adminnavbar";

export default function Reports() {
    const [likedPosts, setLikedPosts] = useState([]);

    useEffect(() => {
        fetchLikedPosts();
    }, []);

    const fetchLikedPosts = () => {
        // Assuming you have a way to identify the admin user ID
        const adminUserId = "admin123"; // Replace this with actual admin user ID

        axios
          .post("http://localhost:5000/admin/liked", { userId: adminUserId })
          .then((res) => {
            setLikedPosts(res.data);
          })
          .catch((err) => console.log(err));
    };
    
    return (
        <div>
            <Adminnavbar />
            <h1>Liked Posts</h1>
            <ul>
                {likedPosts.map(post => (
                    <li key={post._id}>{post.title}</li>
                    // Replace "title" with the actual property of the post you want to display
                ))}
            </ul>
        </div>
    );
}



// // Assume you have a function to fetch data from the backend API
// async function fetchReportedPosts() {
//     try {
//       const response = await fetch('/posts/reported');
//       if (!response.ok) {
//         throw new Error('Failed to fetch reported posts');
//       }
//       const reportedPosts = await response.json();
//       return reportedPosts;
//     } catch (error) {
//       console.error(error);
//       // Handle error, show error message to the user, etc.
//     }
//   }
  
//   // Function to render reported posts on the UI
//   function renderReportedPosts(reportedPosts) {
//     // Assuming you have a container element in your HTML to display reported posts
//     const reportedPostsContainer = document.getElementById('reported-posts-container');
    
//     // Clear previous content
//     reportedPostsContainer.innerHTML = '';
  
//     // Render each reported post
//     reportedPosts.forEach(post => {
//       const postElement = document.createElement('div');
//       postElement.classList.add('post');
      
//       // Add post details to the post element
//       postElement.innerHTML = `
//         <h2>${post.name}</h2>
//         <p>${post.description}</p>
//         <img src="/public/files/${post.image}" alt="Post Image">
//         <p>Reports: ${post.reports}</p>
//       `;
      
//       // Append post element to the container
//       reportedPostsContainer.appendChild(postElement);
//     });
//   }
  
//   // Call the fetchReportedPosts function when the page loads
//   window.onload = async () => {
//     const reportedPosts = await fetchReportedPosts();
//     renderReportedPosts(reportedPosts);
//   };
  