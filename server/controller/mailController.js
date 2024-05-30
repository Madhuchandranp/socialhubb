const nodemailer = require('nodemailer');

const transporter= nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:'amalanu0012@gmail.com',
       pass:'rytk onch vnxs exlo',
    }
});
module.exports=transporter



const postEmail= async (req, res) => {
    try {
      const { recipientEmail } = req.body;
      console.log('Recipient Email:', recipientEmail);
      // Compose email content
      const mailOptions = {
        from: 'amalanu0012@gmail.com', // Sender's email address
        to: recipientEmail, // Recipient's email address
        subject: 'Invitation to Access Website', // Email subject
        text: `
          Hello!
          You have been invited to access our website. Click the link below to access
          "http://localhost:3000/"  .

          Best regards,
          Your Name
        `
        // attachments:[{
        //   filename:
        // }]
      };
  
      // Send the email
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ', info.messageId);
  
      // Optionally, perform database operations here if needed
  
      res.status(200).json({ message: 'Invitation email sent successfully' });
    } catch (error) {
      console.error('Error sending email: ', error);
      res.status(500).json({ error: 'Failed to send invitation email' });
    }
  };
  module.exports={postEmail}
