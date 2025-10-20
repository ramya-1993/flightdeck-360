import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Flights from './pages/Flights';
import BookingForm from './pages/BookingForm';
import ManageBookings from './pages/ManageBookings';
import AdminFlights from './pages/AdminFlights';
import ProtectedRoute from './components/ProtectedRoute';

function App(){
  return (
    <Router>
      <Navbar />
      <div style={{padding:20}}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/flights" element={<Flights />} />
          <Route path="/book/:id" element={
            <ProtectedRoute><BookingForm /></ProtectedRoute>
          } />
          <Route path="/manage-bookings" element={
            <ProtectedRoute><ManageBookings /></ProtectedRoute>
          } />
          <Route path="/admin/flights" element={
            <ProtectedRoute role="admin"><AdminFlights /></ProtectedRoute>
          } />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
