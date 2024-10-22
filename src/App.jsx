import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation, Navigate, useParams } from 'react-router-dom';

import { UserProvider, useUser } from 'contexts/userDataContext';

import NavbarComponent from 'pages/Navbar/components/NavbarComponent';
import LoginPage from 'pages/Login/LoginPage';
import AIPage from 'pages/AI/AIPage';
import NotFound from 'pages/NotFound/NotFoundPage';

import ProjectsListPage from 'pages/Profile/ProjectsListPage';
import PagesListPage from 'pages/Profile/PagesListPage';
import ResultsListPage from 'pages/Profile/ResultsListPage';
import LandingPage from 'pages/Landing/LandingPage';

import 'styles/App.css';

import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';


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
    <div className="app">

      <div className="navbar-container">
        {!isLoginPage && (
            <NavbarComponent isAuth={isAuth} activeUser={activeUser} onLogoutMethod={handleLogout} />
        )}
      </div>

      <div className={!isLoginPage ? "content-container" : 'no-navbar-content-container'}>
      <Routes>

        {/* Route Guard */}
        {isAuth ? (
          // Protected routes
          <>
          <Route exact path="/" element={<Navigate to="/projects" replace />} />

          <Route path="/ai" element={<AIPage/>} />

          <Route path="/projects" element={<ProjectsListPage />} />
          <Route path="/projects/:projectId" element={<RedirectToPages />} />
          <Route path="/projects/:projectId/pages" element={<PagesListPage />} />
          <Route path="/projects/:projectId/pages/:pageId" element={<RedirectToResults />} />
          <Route path="/projects/:projectId/pages/:pageId/results" element={<ResultsListPage />} />

          <Route path="*" element={<NotFound />} />
          </>
        ) : (
          // Public routes
          <>
          <Route exact path="/" element={<LandingPage isAuth={false} />} />
        
          <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
          <Route path="/projects/*" element={<Navigate to="/" replace />} />

          <Route path="*" element={<NotFound />} />
          </>
        )}

      </Routes>
      </div>

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