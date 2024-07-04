import React, { useState ,useEffect} from 'react';
import axios from 'axios';
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

const Mailsend = () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');
  const [users, setUsers] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`http://localhost:5000/mail/sendmail`,  {recipientEmail} );
      setMessage('Invitation email sent successfully');
    } catch (error) {
      console.error('Error sending invitation email: ', error);
      setMessage('Failed to send invitation email');
    }
  };

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

  const handleSendClick = async (email) => {
    try {
      await axios.post(`http://localhost:5000/mail/sendmail`, { recipientEmail: email });
      toast.success(`Invitation email sent successfully to ${email}`);
    } catch (error) {
      console.error(`Error sending invitation email to ${email}: `, error);
      toast.error(`Failed to send invitation email to ${email}`);
    }
  };

  return (
    <div>
      <h2>Send Invitation</h2>
      <button  ><Link to="/">Back</Link> </button>
      <form onSubmit={handleFormSubmit}>
        <label>Email Address:</label>
        <input
          type="email"
          value={recipientEmail}
          onChange={(e) => setRecipientEmail(e.target.value)}
          required
        />
        <button type="submit">Send Invitation</button>
      </form>
      {message && <p>{message}</p>}
      <ul>
          {users.map((user) => (
            <li key={user._id}>
              <strong></strong> {user.email} <br />
              <button onClick={() => handleSendClick(user.email)}>Send Invitation</button>
              </li>
          ))}
        </ul>
    </div>
  );
};

export default Mailsend;
