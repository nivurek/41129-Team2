import React, { useEffect, useState } from 'react';
import { Button, Grid, Header } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import backgroundBanner from '../../assets/background_banner.png';

const Error404 = () => {
  const navigate = useNavigate();

  const [isHovered,setIsHovered] = useState(false);

  // Handle navigation back to home
  const handleGoHome = () => {
    navigate('/');
  };

  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.padding = '0';
    document.documentElement.style.margin = '0';
    document.documentElement.style.padding = '0';
  }, []);

  return (
    <div
      className="landingPages"
      style={{
        height: '100vh',
        width: '100vw',
        margin: 0,  
        padding: 0,  
        boxSizing: 'border-box',  
        backgroundImage: `url(${backgroundBanner})`,
        backgroundSize: 'cover',
        backgroundPosition: 'left',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingRight: '200px',
      }}
    >
      {/* Error message */}
      <div
        className="contentBox"
        style={{
          textAlign: 'center',
          color: '#fff',
        }}
      >
        <Grid textAlign="center" verticalAlign="middle">
          <Grid.Column>
            <Header as="h1" style={{ fontSize: '11em', marginBottom: '20px', color: '#fff' }}>
              Oops!
            </Header>
            <Header as="h2" style={{ fontSize: '3.5em', maxWidth: '600px', color: '#fff' }}>
              404 - PAGE NOT FOUND
            </Header>
            <p style={{ fontSize: '1.5em', color: '#000', maxWidth: '600px', margin: '0 auto' }}>
              Sorry, the page you are looking for doesn’t seem to exist. It might have been removed, had its name changed, or is temporarily unavailable.
            </p>

            {/* Button to go back to homepage */}
            <Button
              size="huge"
              onClick={handleGoHome}
              style={{
                marginTop: '40px',
                color:'#000',
                backgroundColor: 'rgb(229,185,75)',
                backgroundColor: isHovered ? 'rgb(255, 208, 96)' : 'rgb(229,185,75)',
                borderRadius: '35px',
                padding: '15px 30px',
                fontSize: '2em',
                width: '400px',
                height: '70px',
                curse: 'pointer',
              }}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              Go to Homepage
            </Button>
          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

export default Error404;
