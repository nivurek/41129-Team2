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

const SignupGridComponent = () => {
  const navigate = useNavigate();

  // State to hold form values
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
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
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { username, email, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match.');
      return;
    }

    try {
      // Make API call to register auth route
      const response = await axios.post('http://localhost:5050/auth/register', { username, email, password });

      // Handle successful registration
      if (response.status === 201) {
        const token = response.data.token;
        localStorage.setItem('token', token); // Store the token in local storage
        navigate('/'); // Navigate to home page
      }
    } catch (error) {
      // Handle error during registration
      setErrorMessage(error.response?.data?.msg || 'Registration failed. Please try again.');
    }
  };

  return (
    <Grid.Column>
      <Grid.Row>
        <Form onSubmit={handleSubmit} style={{ marginTop: "30px" }}>
          <p style={{ textAlign: "center", fontWeight: "bold", color: "gray" }}>
            Enter your username, email, and password to sign up.
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
            icon="mail"
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
          <Form.Input
            fluid
            icon="lock"
            iconPosition="left"
            placeholder="Confirm Password"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
          />
          <Button fluid size="large" style={{ backgroundColor: "rgb(229,185,75)" }}>
            Sign Up
          </Button>
          {errorMessage && (
            <Message error icon style={{ fontWeight: "bold" }} onClick={() => { setErrorMessage("") }}>
              <Icon name='warning sign' size='mini' />
              {errorMessage}
            </Message>
          )}
        </Form>
      </Grid.Row>
    </Grid.Column>
  );
};

export default SignupGridComponent;