 import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <h2 style={styles.logo}>TaskManager</h2>
      <div style={styles.right}>
        <span style={styles.name}>Hi, {user?.name}</span>
        <button onClick={handleLogout} style={styles.btn}>Logout</button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '14px 30px',
    backgroundColor: '#4f46e5',
    color: 'white'
  },
  logo: { fontSize: '20px', fontWeight: 'bold' },
  right: { display: 'flex', alignItems: 'center', gap: '16px' },
  name: { fontSize: '14px' },
  btn: {
    padding: '7px 16px',
    backgroundColor: 'white',
    color: '#4f46e5',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '600'
  }
};

export default Navbar;
