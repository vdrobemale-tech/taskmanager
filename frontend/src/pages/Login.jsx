 import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import API from '../api/axios';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await API.post('/auth/login', form);
      login(data);
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.box}>
        <h2 style={styles.title}>Login</h2>
        {error && <p style={styles.error}>{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" style={styles.btn}>Login</button>
        </form>
        <p style={styles.link}>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    minHeight: '100vh', display: 'flex',
    justifyContent: 'center', alignItems: 'center', backgroundColor: '#f0f2f5'
  },
  box: {
    backgroundColor: 'white', padding: '36px',
    borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.1)', width: '360px'
  },
  title: { textAlign: 'center', marginBottom: '20px', color: '#4f46e5' },
  input: {
    width: '100%', padding: '11px 14px', marginBottom: '14px',
    border: '1px solid #ddd', borderRadius: '8px', fontSize: '14px', display: 'block'
  },
  btn: {
    width: '100%', padding: '12px', backgroundColor: '#4f46e5',
    color: 'white', border: 'none', borderRadius: '8px',
    fontSize: '15px', cursor: 'pointer', fontWeight: '600'
  },
  error: { color: 'red', marginBottom: '12px', fontSize: '13px' },
  link: { textAlign: 'center', marginTop: '16px', fontSize: '13px' }
};

export default Login;
