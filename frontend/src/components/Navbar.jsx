import React, { useContext, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GlobalContext } from '../context/GlobalContext';
import axios from 'axios';

const Navbar = () => {
  const { user, setUser } = useContext(GlobalContext); 
  const {isLoggedIn, setIsLoggedIn} = useContext(GlobalContext);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/status', {
          withCredentials: true,
        });
        setUser(response.data.user);
      } catch (error) {
        setUser(null); 
      }
    };
    checkLoginStatus();
  }, [setUser,setIsLoggedIn]);

  // Logout function
  const handleLogout = async () => {
    try {
        await axios.get('http://localhost:8080/api/logout', { withCredentials: true });
        setUser(null);
        setIsLoggedIn(false);
        navigate('/');
    } catch (error) {
        console.error('Error during logout:', error);
    }
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.left}>
        <h1 style={styles.logo}>Edu Care Connect</h1>
      </div>
      <div style={styles.right}>
        {user ? (
          <>
            <span style={styles.status}>Logged in as: {user.role}</span>
            <Link to="/profile" style={styles.link}>
              Profile
            </Link>
            {
              user.role==='Student'?(
                <>
                  <Link to="/freecourses" style={styles.link}>
                    Free-Resources
                  </Link>
                  <Link to="/quiz" style={styles.link}>
                    Quiz
                  </Link>
                </>
              ):(
                <>
                  <Link to='/' style={styles.link}>
                    Home
                  </Link>
                </>
              )
            }
            <button onClick={handleLogout} style={styles.button}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/aboutus" style={styles.link}>
              About Us
            </Link>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/signup" style={styles.link}>
              Signup
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    position: 'sticky',
    top: 0,
    zIndex: 1000, 
  },
  left: {
    flex: 1,
  },
  right: {
    display: 'flex',
    gap: '15px',
    alignItems: 'center',
  },
  logo: {
    margin: 0,
  },
  link: {
    color: 'white',
    textDecoration: 'none',
    fontSize: '16px',
  },
  button: {
    backgroundColor: 'white',
    color: '#4CAF50',
    border: 'none',
    padding: '5px 10px',
    cursor: 'pointer',
    borderRadius: '5px',
  },
  status: {
    color: 'white',
    fontSize: '14px',
    marginRight: '10px',
  },
};

export default Navbar;