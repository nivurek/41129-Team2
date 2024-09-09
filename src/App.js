import './App.css';
import React, { useState, useEffect }  from 'react';
import Navbar from './components/navbarComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';

import LoginPage from './pages/loginPage';

// import testData from './testdata.json';

const Home = () => <h1>Home Page</h1>;
const About = () => <h1>About Us</h1>;
const Services = () => <h1>Our Services</h1>;
const Contact = () => <h1>Contact Us</h1>;

function App() {
  const isAuth = true;
  
  const [userData, setUserData] = useState();

  // State to store the logged-in user's data
  const [loggedInUser, setLoggedInUser] = useState(null);

  // Function to handle successful login
  const handleLogin = (userData) => {
    console.log("Login successful!", userData);
    // Update state with the logged-in user's data
    setLoggedInUser(userData);
  };

  const handleLogout = (userData) => {
    console.log("Logout successful!", userData);
    // Update state with the logged-in user's data
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
    <div className="App">
      <Router>
        <Navbar authorisedUser={loggedInUser} userObjects={userObjects} handleLogout={handleLogout} />
        <Container className='primaryContainer'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/login" element={<LoginPage userData={userObjects} handleLogin={handleLogin}/>} />
          </Routes>
        </Container>
    </Router>
    </div>
  );
}

export default App;
