import React, { useState } from 'react';
import { Button, InputText, Password, Message } from 'primereact';
import { useNavigate } from 'react-router-dom';
import 'primereact/resources/themes/saga-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';

const LoginPage_prime = ({ userData, handleLogin }) => {
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
    <div className="p-grid p-align-center p-justify-center" style={{ height: '100vh', paddingTop: "50px" }}>
      <div className="p-col-12 p-md-4">
        <div className="p-card">
          <div className="p-card-header">
            <h2 style={{ textAlign: 'center', color: 'teal' }}>Log in to your account</h2>
          </div>
          <div className="p-card-body">
            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
              <div className="p-fluid">
                <span className="p-float-label">
                  <InputText
                    id="username"
                    name="username"
                    value={formData.username}
                    onChange={handleInputChange}
                    placeholder="Username"
                    className="p-inputtext-lg"
                  />
                  <label htmlFor="username">Username</label>
                </span>
              </div>
              <div className="p-fluid" style={{ marginTop: '1em' }}>
                <span className="p-float-label">
                  <Password
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    feedback={false}
                    placeholder="Password"
                    toggleMask
                  />
                  <label htmlFor="password">Password</label>
                </span>
              </div>
              <Button label="Login" className="p-button-lg p-button-text p-button-outlined" type="submit" style={{ marginTop: '2em', width: '100%' }} />
            </form>
          </div>
          <div className="p-card-footer">
            <Button
              label="Don't have an account? Sign up"
              icon="pi pi-arrow-right"
              className="p-button-lg p-button-outlined p-button-text"
              style={{ width: '100%' }}
            />
          </div>
        </div>

        {errorMessage && (
          <Message severity="error" style={{ marginTop: '1em' }} onClick={() => { setErrorMessage(''); }}>
            <i className="pi pi-exclamation-triangle" style={{ marginRight: '0.5em' }} />
            {errorMessage}
          </Message>
        )}
      </div>
    </div>
  );
};

export default LoginPage_prime;