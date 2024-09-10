import React, { useState } from 'react';
import { Button, TextField, Typography, IconButton, Paper, Alert } from '@mui/material';
import {Grid2 as Grid} from '@mui/material'; // Grid has been deprecated apparantly.
import { useNavigate } from 'react-router-dom';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LockIcon from '@mui/icons-material/Lock';

const LoginPage_mui = ({ userData, handleLogin }) => {
  const navigate = useNavigate();

  // State to hold form values
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  // State to handle error messages (optional)
  const [errorMessage, setErrorMessage] = useState('');

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
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
    <Grid
      container
      direction="column"
      alignItems="center"
      style={{ minHeight: '100vh', paddingTop: '50px' }}
    >
      <Grid item xs={12} md={6}>
        <Paper elevation={6} style={{ padding: '30px' }}>
          <Typography variant="h4" align="center" color="primary" gutterBottom>
            Log in to your account
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={2} alignItems="flex-end">
              <Grid item>
                <AccountCircle />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  fullWidth
                  label="Username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Grid container spacing={2} alignItems="flex-end" style={{ marginTop: '20px' }}>
              <Grid item>
                <LockIcon />
              </Grid>
              <Grid item xs={11}>
                <TextField
                  fullWidth
                  label="Password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              size="large"
              type="submit"
              style={{ marginTop: '30px' }}
            >
              Login
            </Button>
          </form>

          <Button
            fullWidth
            variant="outlined"
            color="secondary"
            style={{ marginTop: '20px' }}
            onClick={() => navigate('/signup')}
          >
            Don't have an account? Sign up
          </Button>

          {errorMessage && (
            <Alert
              severity="error"
              style={{ marginTop: '20px', fontWeight: 'bold' }}
              onClose={() => setErrorMessage('')}
            >
              {errorMessage}
            </Alert>
          )}
        </Paper>
      </Grid>
    </Grid>
  );
};

export default LoginPage_mui;