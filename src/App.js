import './App.css';
import React, { useState, useEffect } from 'react';
import Navbar from './components/navbarComponent';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import LoginPage from './pages/loginPage';
import LoginPage_mui from './pages/loginPage_mui';
import LoginPage_prime from './pages/loginPage_prime';

import backgroundBanner from './assets/background_banner.png'; 

const Home = () => <h1>Home Page</h1>;
const About = () => <h1>About Us</h1>;
const Services = () => <h1>Our Services</h1>;
const Contact = () => <h1>Contact Us</h1>;

const AppContent = ({ loggedInUser, userObjects, handleLogout, handleLogin }) => {
  const location = useLocation();
  const isLoginPage = ['/login', '/loginmui', '/loginprime'].includes(location.pathname);
  console.log("islogin?", isLoginPage);
  

  return (
    <div
      className="App"
      style={{
        backgroundImage: isLoginPage ? `url(${backgroundBanner})` : 'none',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100%',
        width: '100%',
      }}
    >
      {!isLoginPage && (
        <Navbar authorisedUser={loggedInUser} userObjects={userObjects} handleLogout={handleLogout} />
      ) }
      <div className='primaryContainer'>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<LoginPage userData={userObjects} handleLogin={handleLogin}/>} />
          <Route path="/loginmui" element={<LoginPage_mui userData={userObjects} handleLogin={handleLogin}/>} />
          <Route path="/loginprime" element={<LoginPage_prime userData={userObjects} handleLogin={handleLogin}/>} />
        </Routes>
      </div>
    </div>
  );
};

function App() {
  const [userData, setUserData] = useState();

  // State to store the logged-in user's data
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Function to handle successful login
  const handleLogin = (userData) => {
    console.log("Login successful!", userData);
    setLoggedInUser(userData);
  };

  const handleLogout = (userData) => {
    console.log("Logout successful!", userData);
    setLoggedInUser(null);
  };

  useEffect(() => {
    fetch('./testdata.json')
      .then((response) => response.json())  // Parse the JSON data
      .then((jsonData) => {
        setUserData(jsonData);  // Update state with the JSON data
      })
      .catch((error) => {
        console.error("Error fetching the JSON data: ", error);
      });
  }, []);

  let userObjects = {};
  for (let key in userData) {
    userObjects[userData[key].Address] = userData[key];
  }

  return (
    <Router>
      <AppContent
        loggedInUser={loggedInUser}
        userObjects={userObjects}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
      />
    </Router>
  );
}

export default App;