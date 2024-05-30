import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
// import Signup from "./pages/Signup";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Profile from "./pages/Profile";
import CreatePost from "./components/create";
import ViewPost from "./pages/ViewPost";
import Mailsend from "./components/mail/Mailsend";
import Signup from "./pages/Signup"
import Username from "./usercomponents/Username";
import Email from "./usercomponents/Email";
import Password from "./usercomponents/Password";
import Adminhome from "./admincomponents/Adminhome";
import Adminnavbar from "./admincomponents/Adminnavbar";
import Adminsignup from "./admincomponents/Adminsignup";
import Adminlogin from "./admincomponents/Adminlogin";
import Reports from "./admincomponents/Reports";
import Adminpage from "./admincomponents/Adminpage";
import Users from "./admincomponents/Users";

const AuthWrapper = ({ children }) => {
  const navigate = useNavigate();
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/Login");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default function App() {
  return (
    <div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
      />
      <BrowserRouter>
        <Routes>
          {/* pages */}
          <Route path="/" element={<AuthWrapper><Home /></AuthWrapper>}/>
          <Route path="/Home" element={<AuthWrapper><Home /></AuthWrapper>}/>
          <Route path="/Login" element={<Login />} />
          <Route path="/SignUp" element={<Signup />} />
          {/* <Route path="/Signup" element={<Signup/>}/> */}
          <Route path="/profile"element={<AuthWrapper><Profile /></AuthWrapper>}/>
          <Route path="/createpost"element={<AuthWrapper><CreatePost /></AuthWrapper>}/>
          <Route path="/post/:id"element={<AuthWrapper><ViewPost /></AuthWrapper>}/>
          <Route path="/Mailsend"element={<AuthWrapper><Mailsend /></AuthWrapper>}/>
        <Route path="/signup-username" element={<Username />} />
          <Route path="/signup-email" element={<Email />} />
          <Route path="/signup-password" element={<Password />} /> 

          <Route path="/Adminhome" element={<Adminhome />} /> 
          <Route path="/Adminnavbar" element={<Adminnavbar />} /> 
          <Route path="/Adminsignup" element={<Adminsignup />} /> 
          <Route path="/Adminlogin" element={<Adminlogin />} /> 
          <Route path="/Reports" element={<Reports />} /> 
          <Route path="/Adminpage" element={<Adminpage />} /> 
          <Route path="/Users" element={<Users />} /> 

           
        </Routes>
      </BrowserRouter>
    </div>
  );
}
