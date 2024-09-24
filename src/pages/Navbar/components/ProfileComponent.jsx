import React from "react";
import { Link } from 'react-router-dom';
import {
	Menu,
	Icon
} from "semantic-ui-react";
// import { Link } from 'react-router-dom';


const Profile = ({isLoggedIn, activeUser, active, onClickMethod}) => {
	console.log("profile comp - isloggedin?", isLoggedIn);
	
	return (
		<>
			{isLoggedIn ? (
				<Menu.Item
					active={active}
					position="right"
					name="profile"
					onClick={onClickMethod}
					as={Link}
					to='/login'
				>
					<Icon name="user" />
					{activeUser	}
				</Menu.Item>
			) : (
				<Menu.Item
					active={active}
					position="right"
					name="profile"
					onClick={onClickMethod}
					as={Link}
					to='/login'
				>
					<Icon name="user" />
					Log In
				</Menu.Item>
			)}
		</>
	);
};

export default Profile;