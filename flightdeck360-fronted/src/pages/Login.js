import React, {useState} from 'react';
import API from '../api';
import { saveAuth } from '../utils/auth';
import { useNavigate } from 'react-router-dom';

export default function Login(){
  const [form, setForm] = useState({email:'',password:''});
  const navigate = useNavigate();

  const handle = e => setForm({...form,[e.target.name]:e.target.value});
  const submit = async e => {
    e.preventDefault();
    try{
      const res = await API.post('/auth/login', form);
      saveAuth(res.data.token, res.data.user);
      // role-based redirect
      if (res.data.user.role === 'admin') navigate('/admin/flights');
      else navigate('/flights');
    }catch(err){
      alert(err.response?.data?.message || 'Error');
    }
  };
  return (
    <form onSubmit={submit}>
      <h3>Login</h3>
      <input name="email" placeholder="Email" value={form.email} onChange={handle} required /><br/>
      <input name="password" type="password" placeholder="Password" value={form.password} onChange={handle} required /><br/>
      <button>Login</button>
    </form>
  );
}
