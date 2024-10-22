import React, { useState } from 'react';
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

const AppContent = ({ handleLogout, handleLogin }) => {
  const loggedInUser = useUser();
   
  const location = useLocation();
  const isLoginPage = ['/login'].includes(location.pathname);

  const isAuth = loggedInUser !== null;
  const activeUser = (loggedInUser && loggedInUser.name) ?? "";

  const RedirectToPages = () => {
    const { projectId } = useParams();
    return <Navigate to={`/projects/${projectId}/pages`} replace />;
  };
  const RedirectToResults = () => {
    const {projectId, pageId} = useParams();
    return <Navigate to={`/projects/${projectId}/pages/${pageId}/results`} replace />;
  }

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
  // State to store the logged-in user's data
  const [loggedInUser, setLoggedInUser] = useState(() => {
    // Retrieve the login state from local storage
    const savedUser = localStorage.getItem('loggedInUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Function to handle successful login
  const handleLogin = (userData) => {
    console.log("Login successful!", userData);
    setLoggedInUser(userData);
    // Save the login state to local storage
    localStorage.setItem('loggedInUser', JSON.stringify(userData));
  };

  const handleLogout = () => {
    console.log("Logout successful!");
    setLoggedInUser(null);
    // Clear the login state from local storage
    localStorage.removeItem('loggedInUser');
  };

  return (
    <Router>
      <UserProvider value={loggedInUser}>
        <AppContent
          handleLogout={handleLogout}
          handleLogin={handleLogin}
        />
      </UserProvider>
    </Router>
  );
}

export default App;