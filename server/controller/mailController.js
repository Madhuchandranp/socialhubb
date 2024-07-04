const nodemailer = require('nodemailer');
const Post = require('../model/Post'); 
const User = require('../model/User');


const transporter= nodemailer.createTransport({
    service:'Gmail',
    auth:{
        user:'amalanu0012@gmail.com',
       pass:'rytk onch vnxs exlo',
    }
});
module.exports=transporter



// const postEmail= async (req, res) => {
//     try {
//       const { recipientEmail } = req.body;

//       console.log('Recipient Email:', recipientEmail);

//       // Compose email content
//       const mailOptions = {
//         from: 'amalanu0012@gmail.com', // Sender's email address
//         to: recipientEmail, // Recipient's email address
//         subject: 'Invitation to Access Website', // Email subject
//         text: `
//           Hello!
//           You have been invited to access our website. Click the link below to access
//           "http://localhost:3000/"  .

//           Best regards,
//           Your Name
//         `,
//         attachments: [
//           {
//             filename: postImage.originalname,
//             path: postImage.path
//           }
//         ]
//       };
  
//       // Send the email
//       const info = await transporter.sendMail(mailOptions);
//       console.log('Email sent: ', info.messageId);
  
//       // Optionally, perform database operations here if needed
//       fs.unlinkSync(postImage.path);

//       res.status(200).json({ message: 'Invitation email sent successfully' });
//     } catch (error) {
//       console.error('Error sending email: ', error);
//       res.status(500).json({ error: 'Failed to send invitation email' });
//     }
//   };

  const sendMail = async (mailOptions) => {
    try {
      const info = await transporter.sendMail(mailOptions);
      console.log('Email sent: ', info.messageId);
      return info;
    } catch (error) {
      console.error('Error sending email: ', error);
      throw error;
    }
  };

  module.exports={sendMail}
