import React, { useEffect } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'primereact/button';

const NotFound = () => {
  const navigate = useNavigate();

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
    <div className="not-found-page">
      {/* Error message */}
      <div className="not-found-content">
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

            <Button label="Go to Homepage" onClick={handleGoHome} className="button-huge-colored mt-4" />

          </Grid.Column>
        </Grid>
      </div>
    </div>
  );
};

export default NotFound;
