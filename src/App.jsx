import './App.css';
import './styles/globals.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate, useParams } from 'react-router-dom';

import { UserProvider, useUser } from './contexts/userDataContext';

import NavbarComponent from './pages/Navbar/components/NavbarComponent';
import LoginPage from './pages/Login/LoginPage';
import AIPage from './pages/AI/AIPage';

import ProjectsListPage from './pages/Profile/ProjectsListPage';
import PagesListPage from './pages/Profile/PagesListPage';
import ResultsListPage from './pages/Profile/ResultsListPage';

import backgroundBanner from './assets/background_banner.png'; 
import PrimaryScreenshotPage from './pages/PrimaryScreenshot/PrimaryScreenshotPage';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';


const About = () => <h1>About Us</h1>;
const Services = () => <h1>Our Services</h1>;
const Contact = () => <h1>Contact Us</h1>;


const AppContent = () => {
  const {userData, updateUserData } = useUser();
  
  // Use useEffect to load the stored user data when the component mounts
  useEffect(() => {
    const savedUser = localStorage.getItem('userData');
    if (savedUser) {
      updateUserData(JSON.parse(savedUser));
    }
  }, [updateUserData]);

  // Use useEffect to update localStorage whenever userData changes
  useEffect(() => {
    if (userData) {
      localStorage.setItem('userData', JSON.stringify(userData));
    } else {
      localStorage.removeItem('userData'); // Remove if userData is null or undefined
    }
  }, [userData]);

  // Function to handle successful login
  const handleLogin = (userData) => {
    console.log("Login successful!", userData);
    updateUserData(userData);
    // Save the login state to local storage
    localStorage.setItem('userData', JSON.stringify(userData));
  };

  // Function to handle logout
  const handleLogout = () => {
    console.log("Logout successful!");
    updateUserData(null);
    // Clear the login state from local storage
    localStorage.removeItem('userData');
  };


  const location = useLocation();
  const isLoginPage = ['/login'].includes(location.pathname);

  const isAuth = userData !== null;
  const activeUser = (userData && userData.name) ?? "";

  const RedirectToPages = () => {
    const { projectId } = useParams();
    return <Navigate to={`/projects/${projectId}/pages`} replace />;
  };
  const RedirectToResults = () => {
    const {projectId, pageId} = useParams();
    return <Navigate to={`/projects/${projectId}/pages/${pageId}/results`} replace />;
  }

  console.log('Logged In User Data:', userData);

  return (
      <div
        className="App"
        style={{
          backgroundImage: isLoginPage ? `url(${backgroundBanner})` : 'none',
          backgroundSize: 'cover',
          backgroundPosition: '10% center',
          height: '100%',
          width: '100%',
        }}
      >
        {!isLoginPage ? ( // These pages render with a navbar
          <>
            <NavbarComponent authorised={isAuth} activeUser={activeUser} onLogoutMethod={handleLogout} />
            <div className="content-container">
              <Routes>
                <Route path="/" element={<PrimaryScreenshotPage authorised={isAuth}/>} />
                <Route path="/about" element={<About />} />
                <Route path="/services" element={<Services />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/ai" element={<AIPage/>} />

                <Route path="/projects" element={<ProjectsListPage />} />
                <Route path="/projects/:projectId" element={<RedirectToPages />} />
                <Route path="/projects/:projectId/pages" element={<PagesListPage />} />
                <Route path="/projects/:projectId/pages/:pageId" element={<RedirectToResults />} />
                <Route path="/projects/:projectId/pages/:pageId/results" element={<ResultsListPage />} />

              </Routes>
            </div>
          </>
        ) : ( // These pages do not contain a navbar
          <div>
            <Routes>
              <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
            </Routes>
          </div>
        )}
      </div>
  );
};

function App() {
  return (
    <Router>
      <UserProvider>
        <AppContent/>
      </UserProvider>
    </Router>
  );
}

export default App;