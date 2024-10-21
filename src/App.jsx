import './App.css';
import './styles/globals.css';
import React, { useState, useEffect, createContext, useContext } from 'react';
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
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-cyan/theme.css';
import 'primeicons/primeicons.css';
import 'primereact/resources/primereact.css';
import 'primeflex/primeflex.css';


const About = () => <h1>About Us</h1>;
const Services = () => <h1>Our Services</h1>;
const Contact = () => <h1>Contact Us</h1>;

const AppContent = ({ handleLogout, handleLogin }) => {
  const loggedInUser = useUser();
   
  const location = useLocation();
  const isLoginPage = ['/login'].includes(location.pathname);
  console.log("isloginpage?", isLoginPage);

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

  // console.log('Logged In User Data:', loggedInUser);

  return (
    // <PrimeReactProvider>
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
    // {/* </PrimeReactProvider> */}
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