import React, { useState, useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setUser } = useContext(GlobalContext);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    useEffect(() => {
      const checkLoginStatus = async () => {
        try {
          const responseStatus = await axios.get('http://localhost:8080/api/status', {
            withCredentials: true,
          });
          console.log(responseStatus.data.user);
          if (responseStatus.data.user) {
            alert('You are already logged in. Please log out to sign up as a new user.');
            navigate('/');
          }
        } catch (error) {
          console.error('Error checking login status:', error);
        }
      };
  
      checkLoginStatus();
    }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
        const response = await axios.post(
            'http://localhost:8080/api/login',
            { email, password },
            { withCredentials: true }
        );
        setUser(response.data.user);
        setIsLoggedIn(true);
        navigate('/profile');
        window.location.reload();
    } catch (error) {
        console.error('Error during login:', error);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Login
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100vh',
    backgroundColor: '#f4f4f4',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
    color: '#4CAF50',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    width: '300px',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    border: '1px solid #ccc',
    borderRadius: '5px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Login;