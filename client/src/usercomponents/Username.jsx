// // UsernameStep.js
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
//  import avatar from '../pages/assets/profile.jpeg';

// function Username() {
//   const [localUsername, setLocalUsername] = useState("");
//   const nav = useNavigate();

//   const handleNext = () => {
//     if (localUsername) {
//         setLocalUsername(localUsername);
//       nav("/signup-email");
//     } else {
//       console.log("Please enter a username");
//     }
//   };

//   return (
//     <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
//       <div className="back">
//       <h2>Enter Username</h2>
//       <form>
//          <div className="profile flex justify-center py-4 ">
//           <label className="pro">
//            <img src={avatar} alt="avatar" className="pro_img"/>
//           </label> 
//            </div>
//            <div onSubmit={handleNext}>
//           <div>
//             <input
//               type="text"
//               placeholder="Username"
//               value={localUsername}
//               onChange={(e) => setLocalUsername(e.target.value)}
//             />
//             <button type="button" onClick={handleNext}>
//               Next
//             </button>
//           </div></div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default Username;
