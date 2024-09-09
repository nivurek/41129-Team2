import React from "react";
import { Dropdown, Icon, Menu } from "semantic-ui-react";
import { Link, useNavigate } from 'react-router-dom';


const Navbar = ({authorisedUser, userObjects, handleLogout}) => {
  const navigate = useNavigate();
  
  const [activeItem, setActiveItem] = React.useState('home');
  // const [isAuth, setIsAuth] = React.useState(authorised);
  // console.log('isauth', isAuth);

  const handleItemClick = (e, { name }) => setActiveItem(name);
  const performLogout = () => {
    navigate('/');
    handleLogout();
  }
  <button >Print Data</button>
  return (
    <div className="navbar-container">
        <Menu >
          <Menu.Item
            onClick={() => {
              console.log('Data:', userObjects)
            }}
          >
            Print Data
          </Menu.Item>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}        // Use Link component from react-router-dom
            to='/'           // Set route for Home
          />
          {authorisedUser && (
            <Menu.Item
              name='about'
              active={activeItem === 'about'}
              onClick={handleItemClick}
              as={Link}        // Link for About page
              to='/about'
            />
          )}
          
          <Menu.Item
            name='services'
            active={activeItem === 'services'}
            onClick={handleItemClick}
            as={Link}        // Link for Services page
            to='/services'
          />
          <Menu.Item
            name='contact'
            active={activeItem === 'contact'}
            onClick={handleItemClick}
            as={Link}        // Link for Contact page
            to='/contact'
          />

          {authorisedUser ? (
            <Menu.Item position="right" >
              <Dropdown item text={authorisedUser.Name} className='hover-dropdown' position={'right'}>
                <Dropdown.Menu>
                  <Dropdown.Item onClick={performLogout} >Logout</Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          ) : (
            <Menu.Item
              position="right"
              active={false}
              onClick={handleItemClick}
              as={Link}        // Link for Services page
              to='/login'
            >
              <Icon name="user" />
              Log In
            </Menu.Item>
          )}

        </Menu>
    </div>
    
  );
};

export default Navbar;