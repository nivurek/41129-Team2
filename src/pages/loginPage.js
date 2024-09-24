import React, { useState } from 'react';
import {
  Button,
  ButtonGroup,
  Form,
  Grid,
  Header,
  Icon,
  Message,
  Menu,
  MenuItem,
  Segment,
} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

import LoginGrid from '../components/loginComponent';
import SignupGrid from '../components/signupComponent';
import SwitchComponent from '../components/switchComponent';


const LoginPage = ({userData, handleLogin}) => {

  console.log('LoginPage:', userData, handleLogin);

  const [loginMode, setLoginMode] = useState(true);

  const handleToggle = (option) => {
    console.log(`Toggled to: ${option}`)
    // You can perform any action here based on the selected option
  }

  return (
    <div className='landingPages'>
      <div className='rightSideBox' >
        
        <Grid style={{ paddingTop: "200px" }}>
          <Grid.Column style={{ margin: "40px" }}>

            <Grid.Row>
              <Grid.Column className='thisisparent'>
                {/* <SwitchComponent onToggle={handleToggle} /> */}
                <Menu
                  secondary
                  style= {{ backgroundColor: "rgb(241, 241, 241)", borderRadius: "10px" }}
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
                <LoginGrid userData={userData} handleLogin={handleLogin} />
              ) : (
                <SignupGrid/>
              )}
            </Grid.Row>

          </Grid.Column>
        </Grid>
        
      </div>
    </div>
  );
};


export default LoginPage;