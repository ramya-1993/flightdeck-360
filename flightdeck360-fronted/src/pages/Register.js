import React, {useState} from 'react';
import API from '../api';
import { saveAuth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Register(){
  const [form, setForm] = useState({name:'',email:'',password:'',role:'passenger'});
  const navigate = useNavigate();

  const handle = e => setForm({...form,[e.target.name]:e.target.value});
  const submit = async e => {
    e.preventDefault();
    try{
      const res = await API.post('/auth/register', form);
      saveAuth(res.data.token, res.data.user);
      navigate('/');
    }catch(err){
      alert(err.response?.data?.message || 'Error');
    }
  };
  return (
    <form onSubmit={submit}>
      <h3>Register</h3>
      <input name="name" placeholder="Name" value={form.name} onChange={handle} required /><br/>
      <input name="email" placeholder="Email" value={form.email} onChange={handle} required /><br/>
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handle} required /><br/>
      <label>
        Role:
        <select name="role" value={form.role} onChange={handle}>
          <option value="passenger">Passenger</option>
          <option value="admin">Admin</option>
        </select>
      </label><br/>
      <button>Register</button>
    </form>
  );
}
