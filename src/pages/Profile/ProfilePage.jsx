import React, { useState } from "react";

import NotAuthorisedComponent from '../shared/NotAuthorisedComponent';

const ProfilePage = ({authorised}) => {

    if (authorised) return (
      <h1>This is the profile page</h1>
    ); else return (
        <NotAuthorisedComponent />
    )
    
};

export default ProfilePage;