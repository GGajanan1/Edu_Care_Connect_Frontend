import React, { useState,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('Student');
  const [subjects, setSubjects] = useState('');
  const navigate = useNavigate();

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
  const handleSignup = async (e) => {
    e.preventDefault();
  
    try {
      const payload = {
        name,
        email,
        password,
        role,
      };
  
      if (role === 'Teacher' && subjects.trim() !== '') {
        payload.subjects = subjects.split(',').map(sub => sub.trim()).join(', ');
      }
      // console.log(payload)
      
      const response = await axios.post(
        'http://localhost:8080/api/signup',
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
  
      console.log(response.data.message);
      navigate('/login'); 
    } catch (error) {
      const errorMsg =
        error.response?.data?.message || 'Something went wrong during signup';
      console.error('Error during signup:', errorMsg);
      alert(errorMsg); 
    }
  };
  

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Signup</h2>
      <form onSubmit={handleSignup} style={styles.form}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={styles.input}
          required
        />
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
        <select
          value={role}
          onChange={(e) => setRole(e.target.value)}
          style={styles.input}
        >
          <option value="Student">Student</option>
          <option value="Teacher">Teacher</option>
        </select>
        {role === 'Teacher' && (
          <input
            type="text"
            placeholder="Subjects (comma-separated)"
            value={subjects}
            onChange={(e) => setSubjects(e.target.value)}
            style={styles.input}
          />
        )}
        <button type="submit" style={styles.button}>
          Signup
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

export default Signup;