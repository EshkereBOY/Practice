import React from 'react';
import { Link } from 'react-router-dom';
import logo from './logo.png'
import './navbar.css'

const LoggedInNavbar = () => {
    return (
        <div className='Navbar'>
          <img className='Logo' src={logo}/>
          <h1 className='ShopName'>ZALUPA SHOP</h1>
        <nav>
            <ul>
              <Link className='NavLink' to="/">Home</Link>
            </ul>
            <ul>
              <Link className='NavLink' to="/profile">Profile</Link>
            </ul>
        </nav>
        </div>
    );
  };

export default LoggedInNavbar