import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getUser, logout } from '../utils/auth';

export default function Navbar(){
  const user = getUser();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav style={{padding:10, borderBottom:'1px solid #ddd', marginBottom:20}}>
      <Link to="/">Home</Link> | <Link to="/flights">Flights</Link>
      {user ? (
        <>
          {" | "} <Link to="/manage-bookings">Manage Bookings</Link>
          {user.role === 'admin' && <>{" | "} <Link to="/admin/flights">Admin Flights</Link></>}
          {" | "} <span>Hi, {user.name}</span>
          {" | "} <button onClick={handleLogout}>Logout</button>
        </>
      ) : (
        <>
          {" | "} <Link to="/login">Login</Link> | <Link to="/register">Register</Link>
        </>
      )}
    </nav>
  );
}
