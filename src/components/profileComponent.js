import React from "react";
import {
    Menu,
    Icon
} from "semantic-ui-react";
import { Link } from 'react-router-dom';


const Profile = ({isLoggedIn}) => {

  return (
    <>
        {isLoggedIn ? (
            <Menu.Item
                position="right"
            >
                <Icon name="user" />
                Profile
            </Menu.Item>
        ) : (
            <Menu.Item
                position="right"
            >
                <Icon name="user" />
                Log In
            </Menu.Item>
        )}
    </>    
  );
};

export default Profile;