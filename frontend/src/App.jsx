import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { GlobalProvider } from './context/GlobalContext';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Profile from './components/Profile';
import Home from './components/Home';
import FreeCourses from './components/FreeCourses';
import Quiz from './components/Quiz';
import AboutUs from './components/AboutUs';

const App = () => {
  return (
    <GlobalProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<AboutUs />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/freecourses" element={<FreeCourses />} />
          <Route path="/quiz" element={<Quiz/>}/>
          <Route path="/aboutus" element={<AboutUs/>}/>
        </Routes>
      </Router>
    </GlobalProvider>
  );
};

export default App;