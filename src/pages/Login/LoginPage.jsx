import React, { useState } from 'react';
import {
  Button,
  Menu,
  MenuItem,
  Grid,
} from 'semantic-ui-react';
import { useNavigate, Link } from 'react-router-dom';

import SignupGridComponent from './components/SignupGridComponent';
import LoginGridComponent from './components/LoginComponent';
import NavbarComponent from '../Navbar/components/NavbarComponent.jsx'; // Adjust the path as needed

const LoginPage = ({ userData, handleLogin }) => {

  console.log('LoginPage:', userData, handleLogin);

  const [loginMode, setLoginMode] = useState(true);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  // Sample props for the NavbarComponent
  const authorised = false;  // Change based on your auth logic
  const activeUser = null;    // Replace with actual user data if available
  const onLogoutMethod = () => { /* Your logout logic here */ };

  return (
    <div className='landingPages'>
      {/* Include the Navbar Component */}
      <NavbarComponent
        authorised={authorised}
        activeUser={activeUser}
        onLogoutMethod={onLogoutMethod}
      />

      <div className='rightSideBox'>
        {/* ============================  Top Section ============================ */}
        <div style={{ flex: "3", width: "100%" }}>
          <Button
            style={{ margin: '20px' }}
            icon='left arrow'
            labelPosition='left'
            content={'Go Back'}
            onClick={handleGoBack}
          />
        </div>

        {/* ============================ Grid Section ============================ */}
        <div style={{ flex: "8", width: "100%" }}>
          <Grid>
            <Grid.Column style={{ margin: "40px" }}>
              <Grid.Row>
                <Grid.Column className='thisisparent'>
                  <Menu
                    secondary
                    style={{ backgroundColor: "rgb(241, 241, 241)", borderRadius: "10px" }}
                  >
                    <MenuItem
                      style={{ width: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                      <Button fluid basic style={{ boxShadow: "none" }} active={!loginMode} onClick={() => setLoginMode(false)}>
                        Sign Up
                      </Button>
                    </MenuItem>
                    <MenuItem
                      style={{ width: "50%", display: "flex", justifyContent: "center", alignItems: "center" }}
                    >
                      <Button fluid basic style={{ boxShadow: "none" }} active={loginMode} onClick={() => setLoginMode(true)}>
                        Log In
                      </Button>
                    </MenuItem>
                  </Menu>
                </Grid.Column>
              </Grid.Row>

              <Grid.Row>
                {loginMode ? (
                  <LoginGridComponent userData={userData} handleLogin={handleLogin} />
                ) : (
                  <SignupGridComponent />
                )}
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </div>
        {/* ======================================================== */}
      </div>
    </div>
  );
};

export default LoginPage;