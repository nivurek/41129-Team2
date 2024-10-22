import React from "react";
import { Link } from 'react-router-dom';
import {
	Dropdown,
	Icon,
	Menu,
} from "semantic-ui-react";


const ProfileComponent = ({isAuth, activeUser, onLogoutMethod, active, onClickMethod}) => {
	return (
		<>
			{isAuth ? (
				<Menu.Item position="right">
					<Dropdown
						trigger={
							<>
								<Icon name="user" />
								{activeUser}
							</>
						}
						pointing="top right"
						icon={null} /* Hide default dropdown icon */
					>
						<Dropdown.Menu>
							<Dropdown.Item as={Link} to="/projects" text="Projects" icon="user" />
							<Dropdown.Item text="Logout" icon="sign-out" onClick={onLogoutMethod} />
						</Dropdown.Menu>
					</Dropdown>
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

export default ProfileComponent;