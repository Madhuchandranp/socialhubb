/* eslint-disable react-hooks/exhaustive-deps */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./Comment.css";
import { Link } from "react-router-dom";

function CommentContainer({ id }) {
  const [text, setText] = useState("");
  const [input, setInput] = useState("");
  const [comments, setComments] = useState([]);
  const [replyCommentId, setReplyCommentId] = useState(null);
  const [replies, setReplies] = useState({});

  const user = JSON.parse(localStorage.getItem("user"));

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      if (!user || !user.user || !user.user.username) {
        toast.error("User information is missing");
        return;
      }
      await axios.post(`http://localhost:5000/comment/`, {
        id,
        text: input,
        user: user.user.username,
      });
      setInput("");
      toast.success("Comment added!");
    } catch (error) {
      toast.error("Failed to add comment");
    }
  };

  const handleReplySubmit = async (commentId) => {
    try {
      if (!user || !user.user || !user.user.username) {
        toast.error("User information is missing");
        return;
      }
      await axios.post(`http://localhost:5000/comment/comment/${commentId}/reply`, {
        text,
        user: user.user.username,
      });
      setText("");
      setReplyCommentId(null);
      toast.success("Reply added!");
      fetchComments(); // Fetch comments again after adding a reply
    } catch (error) {
      console.error("Error adding reply:", error); // Log the error for debugging
      toast.error("Failed to add reply");
    }
  };

  const fetchComments = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/comment/${id}`);
      console.log("Fetched comments:", response.data); // Log fetched data for debugging
      setComments(response.data.comments || []);
    } catch (error) {
      console.error("Failed to fetch comments:", error); // Log the error for debugging
      toast.error("Failed to fetch comments");
    }
  }; 

  const fetchReplies = async(commentId)=>{
try {
  const response = await axios.get(`http://localhost:5000/comment/comment/${commentId}/replies`);
  console.log("fetched replies:",response.data);
  setReplies((prevReplies)=>({
    ...prevReplies,
    [commentId]:response.data.comment.replies ||[]
  }));
} catch (error) {
  console.error("failed to fetch replies:",error);
  toast.error("failed to fetch replies");
}
  };

  const handleDeleteComment = async (commentId) => {
    try {
      await axios.delete(`http://localhost:5000/comment/comment/${commentId}`);
      toast.success("Comment deleted successfully");
      fetchComments(); // Refresh comments after deletion
    } catch (error) {
      console.error("Failed to delete comment:", error); // Log the error for debugging
      toast.error("Failed to delete comment");
    }
  };


  useEffect(() => {
    fetchComments();
    const refreshInterval = setInterval(fetchComments, 2000);
    return () => clearInterval(refreshInterval);
    fetchReplies();

  }, []);

  return (
    <div className="">
      <button  ><Link to="/">Back</Link> </button>
      
      <div className="comment-container">
        <form className="comment-form" onSubmit={handleSubmit}>
          <input
            className="comment-input"
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Write a comment..."
          />
          <button className="submit-button" type="submit">
            Submit
          </button>
        </form>
       
        <div className="comments-section">
          {comments.length > 0 ? (
            comments?.map((data, index) => (
              <div className="comment-card" key={index}>
                <p className="comment-author">
                  Comment by: <span className="author-name">{data.user}</span>
                </p>
                <p className="comment-text">{data.text}</p>
                {user && user.user && user.user.username === data.user && (
                   <button
                   onClick={() => setReplyCommentId(replyCommentId === data._id ? null : data._id)}
                   >Reply
                 </button>
                
                )}
                 <button
                  className="delete-button"
                  onClick={() => handleDeleteComment(data._id)}
                >
                  Delete
                </button>
                {replyCommentId === data._id && (
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      handleReplySubmit(data._id);
                    }}
                  >
                    <textarea
                      value={text}
                      onChange={(e) => setText(e.target.value)}
                      placeholder="Type your reply here..."
                      required
                    ></textarea>
                    <button type="submit">Submit Reply</button>
                  </form>
                )}

                {replies[data.id] && replies[data.id].map((reply, replyIndex) => (
                  <div key={replyIndex} className="reply-card">
                    <p className="reply-author">
                      Reply by:{" "}
                      <span className="author-name">{reply.user}</span>
                    </p>
                    <p className="reply-text">{reply.text}</p>
                  </div>
                ))}
              </div>
            ))
          ) : (
            <p>No comments available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default CommentContainer;
