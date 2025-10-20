import React, {useState, useEffect} from 'react';
import API from '../api';
import { useParams, useNavigate } from 'react-router-dom';

export default function BookingForm(){
  const { id } = useParams();
  const navigate = useNavigate();
  const [flight, setFlight] = useState(null);
  const [form, setForm] = useState({ passengerName: '', contactNumber:'', email:'', totalPassengers:1, assistanceRequired:false });

  useEffect(()=> {
    API.get(`/flights/${id}`).then(res => setFlight(res.data)).catch(()=>alert('Cannot load flight'));
  },[id]);

  const submit = async e => {
    e.preventDefault();
    try {
      await API.post('/bookings', { ...form, flightId: id });
      alert('Booking requested');
      navigate('/manage-bookings');
    } catch (err) {
      alert(err.response?.data?.message || 'Error');
    }
  };

  if (!flight) return <div>Loading...</div>;
  return (
    <div>
      <h3>Book: {flight.flightName} ({flight.flightNumber})</h3>
      <form onSubmit={submit}>
        <input placeholder="Passenger Name" value={form.passengerName} onChange={e=>setForm({...form,passengerName:e.target.value})} required /><br/>
        <input placeholder="Contact Number" value={form.contactNumber} onChange={e=>setForm({...form,contactNumber:e.target.value})} /><br/>
        <input placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} /><br/>
        <input type="number" min="1" value={form.totalPassengers} onChange={e=>setForm({...form,totalPassengers:parseInt(e.target.value)})} /><br/>
        <label>
          Assistance required:
          <input type="checkbox" checked={form.assistanceRequired} onChange={e=>setForm({...form,assistanceRequired:e.target.checked})} />
        </label><br/>
        <button>Request Booking</button>
      </form>
    </div>
  );
}
