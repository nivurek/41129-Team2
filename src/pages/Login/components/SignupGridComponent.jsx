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


const SignupGridComponent = ({userData, handleLogin}) => {
  const navigate = useNavigate();

  // State to hold form values
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // State to handle error messages (optional)
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (e, { name, value }) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = () => {
    const { username, password } = formData;
    console.log('Form Data:', formData);

    // Mock login logic (replace with your API call)
    const userObject = userData[username];
    console.log("Found user >", userObject);
    if (userObject === undefined) {
      setErrorMessage("Invalid username or password");
    } else {
      if (userObject.Password === password) {
        console.log("Success");
        setErrorMessage("");
        navigate('/');
        handleLogin(userObject);
      } else {
        console.log("Fail");
        setErrorMessage("Invalid username or password");
      }
    }
  };

  return (
      <Grid.Column>

        <Grid.Row>
          <Form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
            <p style={{ textAlign: "center", fontWeight: "bold", color: "gray" }}>
              Enter your email and confirm a password to sign up.
            </p>
            <Form.Input
              fluid
              icon="user"
              iconPosition="left"
              placeholder="Username"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />
            <Form.Input
              fluid
              icon="lock"
              iconPosition="left"
              placeholder="Confirm Password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
            />

            <Button fluid size="large" style={{ backgroundColor: "rgb(229,185,75)" }}>
              Sign Up
            </Button>

            {errorMessage && (
              <Message error icon style={{fontWeight: "bold"}} onClick={()=> {setErrorMessage("")}}>
                <Icon name='warning sign' size='mini'/>
                {errorMessage}
              </Message>
            )}
          </Form>
        </Grid.Row>

      </Grid.Column>
    
  )
}

export default SignupGridComponent;