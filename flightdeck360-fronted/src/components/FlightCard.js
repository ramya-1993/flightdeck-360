import React from 'react';
import { Link } from 'react-router-dom';

export default function FlightCard({flight}) {
  return (
    <div style={{border:'1px solid #ddd', padding:10, marginBottom:10}}>
      <h4>{flight.flightName} ({flight.flightNumber})</h4>
      <p>{flight.from} → {flight.to}</p>
      <p>{new Date(flight.journeyDateTime).toLocaleString()}</p>
      <Link to={`/book/${flight._id}`}>Book</Link>
    </div>
  );
}
