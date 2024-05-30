import React, { useState } from 'react';
import axios from 'axios';

const Mailsend = () => {
  const [recipientEmail, setRecipientEmail] = useState('');
  const [message, setMessage] = useState('');

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

  return (
    <div>
      <h2>Send Invitation</h2>
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
    </div>
  );
};

export default Mailsend;
