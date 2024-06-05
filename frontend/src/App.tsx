import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterPage from './pages/auth/registration/register.tsx';
import './App.css'
import LoggedInNavbar from './assets/components/LoggedInNavbar.tsx';
import LoggedOutNavbar from './assets/components/LoggedOutNavbar.tsx';
import LoginPage from './pages/auth/login/login.tsx';
import HomePage from './pages/auth/homepage/homepage.tsx';
import ProfilePage from './pages/auth/profilepage/ProfilePage.tsx';


const App = () => {

  const [isLoggedIn, setIsLoggedIn] = useState(true);

  const login = () => {
    setIsLoggedIn(true);
  };

  const logout = () => {
    setIsLoggedIn(false);
  };

  return (
    <Router>
      {isLoggedIn ? <LoggedInNavbar /> : <LoggedOutNavbar />}
      <Routes>
        <Route path="/registration" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/" element={<HomePage/>} />
        <Route path="/profile" element={<ProfilePage/>}/>
      </Routes>
    </Router>
  );
};

export default App;