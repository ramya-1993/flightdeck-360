import React, {useState, useEffect} from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

export default function AdminFlights(){
  const [flights, setFlights] = useState([]);
  const [form,setForm] = useState({flightNumber:'',flightName:'',from:'',to:'',journeyDateTime:'',seats:100});
  const navigate = useNavigate();

  const load = async ()=> {
    try { const res = await API.get('/flights'); setFlights(res.data); } catch (err) {}
  };
  useEffect(()=> load(), []);

  const submit = async e => {
    e.preventDefault();
    try {
      await API.post('/flights', form);
      setForm({flightNumber:'',flightName:'',from:'',to:'',journeyDateTime:'',seats:100});
      load();
    } catch (err) { alert('Error'); }
  };

  const del = async id => {
    if (!window.confirm('Delete?')) return;
    await API.delete(`/flights/${id}`);
    load();
  };

  return (
    <div>
      <h3>Admin Flights</h3>
      <form onSubmit={submit}>
        <input placeholder="Flight Number" value={form.flightNumber} onChange={e=>setForm({...form,flightNumber:e.target.value})} required />
        <input placeholder="Flight Name" value={form.flightName} onChange={e=>setForm({...form,flightName:e.target.value})} required />
        <input placeholder="From" value={form.from} onChange={e=>setForm({...form,from:e.target.value})} required />
        <input placeholder="To" value={form.to} onChange={e=>setForm({...form,to:e.target.value})} required />
        <input type="datetime-local" value={form.journeyDateTime} onChange={e=>setForm({...form,journeyDateTime:e.target.value})} required />
        <input type="number" value={form.seats} onChange={e=>setForm({...form,seats:parseInt(e.target.value)})} />
        <button>Add Flight</button>
      </form>

      <div>
        {flights.map(f => (
          <div key={f._id} style={{border:'1px solid #ddd',padding:10,margin:10}}>
            <p>{f.flightName} ({f.flightNumber})</p>
            <p>{f.from} → {f.to} | {new Date(f.journeyDateTime).toLocaleString()}</p>
            <button onClick={()=>del(f._id)}>Delete</button>
          </div>
        ))}
      </div>
    </div>
  );
}
