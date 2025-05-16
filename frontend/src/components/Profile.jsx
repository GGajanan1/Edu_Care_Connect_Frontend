import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      
      try {
        const response = await axios.get('http://localhost:8080/api/user', {
          withCredentials: true,
        });
        localStorage.setItem('id', response.data.user.id);
        setUserData(response.data.user);
        console.log(response.data.user);
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data?.message || error.message);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <div style={styles.container}>
        <h2 style={styles.title}>Loading...</h2>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Profile</h2>
      <div style={styles.card}>
        <p><strong>Name:</strong> {userData.name}</p>
        <p><strong>Email:</strong> {userData.email}</p>
        <p><strong>Role:</strong> {userData.role}</p>
        <p><strong>Total Points:</strong> {userData.score*5}</p>
        {userData.role === 'Teacher' && userData.subjects && (
          <p><strong>Subjects:</strong> {userData.subjects  }</p>
        )}
      </div>
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
  card: {
    backgroundColor: 'white',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    width: '300px',
    textAlign: 'left',
  },
  text: {
    fontSize: '16px',
    marginBottom: '10px',
  },
};

export default Profile;