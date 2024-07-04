// import axios from "axios";
// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import "./CreatePost.css";
// import Navbar from "../navbar";

// export default function CreatePost() {
//   const user = JSON.parse(localStorage.getItem("user"));
//   const username = user.user.username;
//   const [description, setDescription] = useState("");
//   const [photo, setPhoto] = useState(null);
//   const [posts, setPosts] = useState([]);
//   const [comment, setComment] = useState("");

//   const handleUpload = () => {
//     const formData = new FormData();
//     formData.append("photo", photo);
//     formData.append("name", username);
//     formData.append("description", description);

//     axios
//       .post("http://localhost:5000/post/create", formData)
//       .then((res) => {
//         toast.success("post created successfully!", {
//           style: {
//             borderRadius: "10px",
//             background: "#333",
//             color: "#fff",
//           },
//         });
//         fetchPosts();
//       })
//       .catch((err) => console.log(err));
//   };

//   const fetchPosts = () => {
//     axios
//       .get("http://localhost:5000/post")
//       .then((res) => setPosts(res.data))
//       .catch((err) => console.log(err));
//   };

//   const handleLike = (postId) => {
//     axios
//       .post("http://localhost:5000/post/like", { postId, userId: username })
//       .then((res) => {
//         toast.success(res.data.message);
//         fetchPosts(); // Refresh posts
//       })
//       .catch((err) => console.log(err));
//   };

//   const handleComment = (postId, text) => {
//     axios
//       .post("http://localhost:5000/post/comment", { postId, userId: username, text })
//       .then((res) => {
//         toast.success(res.data.message);
//         fetchPosts(); // Refresh posts
//       })
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     fetchPosts();
//   }, []);

//   return (
//    <div className="">
//     <Navbar/>
//      <div className="parent">
      
//       <div className="create-post">
//         <input
//           className="create-post-input"
//           value={description}
//           onChange={(e) => setDescription(e.target.value)}
//           type="text"
//           placeholder="description"
//         />
//         <input
//           className="create-post-file"
//           onChange={(e) => setPhoto(e.target.files[0])}
//           type="file"
//           placeholder="Add file"
//         />

//         <button className="create-post-button" onClick={handleUpload}>
//           Submit
//         </button>
//       </div>
//     </div>
//    </div>
//   );
// }
import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "./CreatePost.css";
import Navbar from "../navbar";

export default function CreatePost() {
  const user = JSON.parse(localStorage.getItem("user"));
  const username = user.user.username;
  const [description, setDescription] = useState("");
  const [photo, setPhoto] = useState(null);
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState("");

  const handleUpload = () => {
    const formData = new FormData();
    formData.append("photo", photo);
    formData.append("name", username);
    formData.append("description", description);

    axios
      .post("http://localhost:5000/post/create", formData)
      .then((res) => {
        toast.success("Post created successfully!", {
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        fetchPosts();
        setDescription("");
        setPhoto(null);
      })
      .catch((err) => console.log(err));
  };

  const fetchPosts = () => {
    axios
      .get("http://localhost:5000/post")
      .then((res) => setPosts(res.data))
      .catch((err) => console.log(err));
  };

  const handleLike = (postId) => {
    axios
      .post("http://localhost:5000/post/like", { postId, userId: username })
      .then((res) => {
        toast.success(res.data.message);
        fetchPosts(); // Refresh posts
      })
      .catch((err) => console.log(err));
  };

  const handleComment = (postId) => {
    if (comment.trim() === "") return;
    axios
      .post("http://localhost:5000/post/comment", { postId, userId: username, text: comment })
      .then((res) => {
        toast.success(res.data.message);
        fetchPosts(); // Refresh posts
        setComment("");
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="parent">
        <div className="create-post">
          <input
            className="create-post-input"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            type="text"
            placeholder="Description"
          />
          <input
            className="create-post-file"
            onChange={(e) => setPhoto(e.target.files[0])}
            type="file"
            accept="image/*,video/*"
            placeholder="Add file"
          />
          <button className="create-post-button" onClick={handleUpload}>
            Submit
          </button>
        </div>
        <div className="posts">
          {posts.map((post) => (
            <div key={post._id} className="post">
              <h3>{post.name}</h3>
              {post.image && <img src={`public/files/${post.image}`} alt={post.description} />}
              {post.video && <video controls src={`public/files/${post.video}`} />}
              <p>{post.description}</p>
              <button onClick={() => handleLike(post._id)}>
                Like ({post.likes})
              </button>
              <div className="comments">
                {post.comments.map((comment, index) => (
                  <p key={index}>
                    <strong>{comment.user}:</strong> {comment.text}
                  </p>
                ))}
                <input
                  type="text"
                  placeholder="Add a comment"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleComment(post._id);
                    }
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
