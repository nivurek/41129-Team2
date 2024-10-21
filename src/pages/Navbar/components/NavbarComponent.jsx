import React from "react";
import { Menu, Icon } from "semantic-ui-react";
import { Link } from 'react-router-dom';

import ProfileComponent from "./ProfileComponent";


const NavbarComponent = ({authorised, activeUser, onLogoutMethod}) => {
  
  const [activeItem, setActiveItem] = React.useState('home');
  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <div className="navbar-container">
        <Menu secondary>
          <Menu.Item
            name='home'
            active={activeItem === 'home'}
            onClick={handleItemClick}
            as={Link}        // Use Link component from react-router-dom
            to='/'
          >
            <Icon name='home' />
            Home
          </Menu.Item>
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

          <ProfileComponent
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

export default NavbarComponent;