import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from 'react-router-dom';

import ProfileComponent from "./ProfileComponent";


const NavbarComponent = ({authorised, activeUser, onLogoutMethod}) => {
  
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