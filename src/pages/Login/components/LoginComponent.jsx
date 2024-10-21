import React, { useState } from 'react';
import {
  Button,
  Form,
  Grid,
  Icon,
  Message,
} from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginGridComponent = ({userData, handleLogin}) => {

  const navigate = useNavigate();

  // State to hold form values
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  // State to handle error messages (optional)
  const [errorMessage, setErrorMessage] = useState('');

  // State to toggle between login and register
  const [isLogin, setIsLogin] = useState(true);

  // Handle form input changes
  const handleInputChange = (e, { name, value }) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = formData;

    try {
      const url = isLogin ? 'http://localhost:5001/auth/login' : 'http://localhost:5001/auth/register';
      const response = await axios.post(url, { email, password });

      // Handle successful login or registration
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token); // Store the token in local storage
        handleLogin({ Name: email }); // Call handleLogin with user data
        navigate('/'); // Navigate to home page
      }
    } catch (error) {
      // Handle error during login or registration
      setErrorMessage(error.response?.data?.msg || `${isLogin ? 'Login' : 'Registration'} failed. Please try again.`);
    }
  };

  console.log("Errormsg:", errorMessage);
  

  return (
  <Grid.Column>

  <Grid.Row>
    <Form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
      <Form.Input
        fluid
        icon="user"
        iconPosition="left"
        placeholder="Email"
        name="email"
        value={formData.email}
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

      <Button fluid size="large" style={{ backgroundColor: "rgb(229,185,75)" }}>
        Login
      </Button>

      {errorMessage && (
        <Message error icon style={{fontWeight: "bold"}} onClick={()=> {setErrorMessage("")}}>
          <Icon name='warning sign' size='mini'/>
          {errorMessage}
        </Message>
      )}
    </Form>
  </Grid.Row>

  <Grid.Row columns={2} style={{fontWeight: "bold" }}>
    {/* <Grid.Column>
      x
    </Grid.Column>
    <Grid.Column>
      x
    </Grid.Column> */}
    {/* <Segment>
    <Grid columns={2}>
      <Grid.Column textAlign='right'>
        Forgot your password?
      </Grid.Column>
      <Grid.Column style={{ color: "rgb(229,185,75)" }}>
        Reset password
      </Grid.Column>
    </Grid>
    </Segment> */}


    <Grid stackable style={{ paddingTop: "40px" }}>
      <Grid.Row columns={2} style={{ fontWeight: 'bold' }}>
        {/* Outer columns */}
        <Grid.Column width={8} style={{ display: 'flex', justifyContent: 'right' }}>
          <div style={{ textAlign: 'center'}}>
            Forgot your password?
          </div>
        </Grid.Column>
        <Grid.Column width={8} style={{ display: 'flex', justifyContent: 'left' }}>
          <div style={{ textAlign: 'center', color: 'rgb(229,185,75)' }}>
            Reset Password
          </div>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Grid.Row>

</Grid.Column>

    )
}

export default LoginGridComponent;