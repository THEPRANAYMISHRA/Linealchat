import {
  Routes, Route, Navigate, useNavigate
} from "react-router-dom";
import React, { useEffect } from 'react';
import Login from "./components/login/Login";
import Signup from "./components/signup/Signup";
import ChatScreen from "./components/chats/ChatScreen";
import UserList from "./components/userlist/UserList";
import { UserlistProvider } from './userlistContext';


function App() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('marschattoken');

  //   if (!token) {
  //     navigate('/login')
  //   } else {
  //     navigate('/chats')
  //   }
  // })

  return (
    <Routes path="/" element={<Login />}>
      <Route path="/chat" element={<UserlistProvider><ChatScreen /></UserlistProvider>} />
      <Route path="/chats" element={<UserlistProvider><UserList /></UserlistProvider>} />
      <Route path="/login" element={<UserlistProvider><Login /></UserlistProvider>} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}


export default App;
