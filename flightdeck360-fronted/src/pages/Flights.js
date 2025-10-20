import React, {useState, useEffect} from 'react';
import API from '../api';
import FlightCard from '../components/FlightCard';

export default function Flights(){
  const [flights,setFlights] = useState([]);
  const [q, setQ] = useState({from:'',to:'',journeyDate:''});

  const search = async e => {
    e.preventDefault();
    try {
      const params = {};
      if (q.from) params.from = q.from;
      if (q.to) params.to = q.to;
      if (q.journeyDate) params.journeyDate = q.journeyDate;
      const res = await API.get('/flights',{ params });
      setFlights(res.data);
    } catch (err) { alert('Error fetching'); }
  };

  useEffect(()=>{ search(new Event('init')); }, []);

  return (
    <div>
      <h3>Available Flights</h3>
      <form onSubmit={search}>
        <input placeholder="From" value={q.from} onChange={e=>setQ({...q,from:e.target.value})} />
        <input placeholder="To" value={q.to} onChange={e=>setQ({...q,to:e.target.value})} />
        <input type="date" value={q.journeyDate} onChange={e=>setQ({...q,journeyDate:e.target.value})} />
        <button>Search</button>
      </form>
      <div>
        {flights.length === 0 ? <p>No flights</p> : flights.map(f => <FlightCard flight={f} key={f._id} />)}
      </div>
    </div>
  );
}
