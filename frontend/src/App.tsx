import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import RegisterPage from './auth/registration/register.tsx'
import './App.css'
import Navbar from './assets/components/navbar.tsx';
import LoginPage from './auth/login/login.tsx';

const App = () => {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route path="/registration" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage/>} />
      </Routes>
    </Router>
  );
};

export default App;