import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css'

const Navbar = () => {
  return (
      <nav>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/registration">regisration</Link>
          </li>
          <li>
            <Link to="/login">login</Link>
          </li>
      </nav>
  );
};

export default Navbar;