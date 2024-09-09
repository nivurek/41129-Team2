import React, { useState } from 'react';
import { Button, Form, Grid, Header, Icon, Message, Segment } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({userData, handleLogin}) => {
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
    <Grid textAlign="center" style={{ height: '100%', paddingTop: "50px" }} verticalAlign="middle">
      <Grid.Column style={{ maxWidth: 450 }}>
        <Header as="h2" color="teal" textAlign="center">
          Log in to your account
        </Header>
        <Form size="large" onSubmit={handleSubmit}>
          <Segment style={{ padding: "30px" }}>
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

            <Button color="teal" fluid size="large">
              Login
            </Button>
          </Segment>
        </Form>
        
        <Segment>
        <Button
          content={'Don\'t have an account? Sign up'}
          icon={'right arrow'}
          labelPosition='right'
          fluid
          basic
          color='white'
        />
        </Segment>

        {errorMessage && (
          <Message error icon style={{fontWeight: "bold"}} onClick={()=> {setErrorMessage("")}}>
            <Icon name='warning sign' size='mini'/>
            {errorMessage}
          </Message>
        )}
      </Grid.Column>
    </Grid>
  );
};

export default LoginPage;