import './App.css';
import React from 'react';
import Navbar from './pages/navbar/navbarComponent';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'semantic-ui-react';
import Main from './pages/primaryScreenshot/primaryInputPage'
const Home = () => <h1>Home Page</h1>;
const About = () => <h1>About Us</h1>;
const Services = () => <h1>Our Services</h1>;
const Contact = () => <h1>Contact Us</h1>;

function App() {
  const isAuth = true;
  
  return (
    <div className="App">
      <Router>
      <div>
        <Navbar authorised={isAuth} />
        <Container>
          <Routes>
            <Route path="/" element={<Main authorised={isAuth}/>} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </Container>
      </div>
    </Router>
    </div>
  );
}

export default App;
