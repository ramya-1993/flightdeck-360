import React, {useState, useEffect} from 'react';
import API from '../api';
import { getUser } from '../utils/auth';

export default function ManageBookings(){
  const [bookings, setBookings] = useState([]);
  const user = getUser();

  const load = async () => {
    try {
      const res = await API.get('/bookings');
      setBookings(res.data);
    } catch (err) { alert('Error'); }
  };

  useEffect(()=>{ load(); }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/bookings/${id}/status`, { status });
      load();
    } catch (err) { alert('Error updating'); }
  };

  return (
    <div>
      <h3>{user?.role === 'admin' ? 'All Bookings' : 'My Bookings'}</h3>
      {bookings.map(b => (
        <div key={b._id} style={{border:'1px solid #ddd',padding:10,marginBottom:10}}>
          <p><strong>{b.passengerName}</strong> - {b.flightNumber} ({new Date(b.journeyDateTime).toLocaleString()})</p>
          <p>Passengers: {b.totalPassengers} | Assistance: {b.assistanceRequired ? 'Yes':'No'}</p>
          <p>Status: {b.status}</p>
          {user.role === 'admin' && b.status === 'Pending' && (
            <>
              <button onClick={()=>updateStatus(b._id,'Approved')}>Approve</button>
              <button onClick={()=>updateStatus(b._id,'Rejected')}>Reject</button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
