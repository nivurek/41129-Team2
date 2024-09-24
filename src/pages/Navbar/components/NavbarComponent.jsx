import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from 'react-router-dom';

import Profile from "./ProfileComponent";


const Navbar = ({authorised, activeUser, onLogoutMethod}) => {
  
  const [activeItem, setActiveItem] = React.useState('home');
  // const [isAuth, setIsAuth] = React.useState(authorised);
  // console.log('isauth', isAuth);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div className="navbar-container">
        <Menu >
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}        // Use Link component from react-router-dom
            to='/'           // Set route for Home
          />
          {authorised && (
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

          <Profile
            isLoggedIn={authorised}
            activeUser={activeUser}
            onLogoutMethod={onLogoutMethod}
            active={activeItem === 'profile'}
            onClickMethod={handleItemClick}
          />

        </Menu>
    </div>
    
  );
};

export default Navbar;