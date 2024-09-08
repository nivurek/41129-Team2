import React from "react";
import { Menu } from "semantic-ui-react";
import { Link } from 'react-router-dom';


const Navbar = (authorised) => {
  const [activeItem, setActiveItem] = React.useState('home');

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Menu pointing secondary>
      <Menu.Item
        name='home'
        active={activeItem === 'home'}
        onClick={handleItemClick}
        as={Link}        // Use Link component from react-router-dom
        to='/'           // Set route for Home
      />
      <Menu.Item
        name='about'
        active={activeItem === 'about'}
        onClick={handleItemClick}
        as={Link}        // Link for About page
        to='/about'
      />
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
    </Menu>
  );
};

export default Navbar;