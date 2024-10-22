import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from 'react-router-dom';

import ProfileComponent from "./ProfileComponent";


const NavbarComponent = ({isAuth, activeUser, onLogoutMethod}) => {
  
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
            to='/'           // Set route for Home
          />

          <ProfileComponent
            isAuth={isAuth}
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