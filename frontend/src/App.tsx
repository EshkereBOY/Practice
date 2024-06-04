import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterPage from './pages/auth/registration/register.tsx';
import './App.css'
import Navbar from './assets/components/navbar.tsx';
import LoginPage from './pages/auth/login/login.tsx';
import HomePage from './pages/auth/homepage/homepage.tsx';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/registration" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
        <Route path="/home" element={<HomePage/>} />
      </Routes>
    </Router>
  );
};

export default App;