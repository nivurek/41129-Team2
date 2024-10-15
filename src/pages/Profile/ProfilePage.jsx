import React, { useState } from "react";

import {
  CardMeta,
  CardHeader,
  CardDescription,
  CardContent,
  Card,
  Icon,
  Image,
  CardGroup,
} from 'semantic-ui-react'

import NotAuthorisedComponent from '../shared/NotAuthorisedComponent';

const ProfilePage = ({authorised, userData}) => {
  
  console.log('Entered profile page with userdata:', userData);
  

  if (authorised) return (
    <>
      <h1>This is the profile page</h1>
      <CardGroup>
        {userData.Projects.map(project => (
          <Card onClick={()=>{console.log('Clicked on project', project.Name)}}>
            <Image src='https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' wrapped ui={false} />
            <CardContent>
              <CardHeader>{project.Name}</CardHeader>
              <CardMeta>
                <span className='date'>Last edited {project.LastEditedDate}</span>
              </CardMeta>
              <CardDescription>
                {project.Description}
              </CardDescription>
            </CardContent>
            <CardContent extra>
              <Icon name='file' />
              {project.Pages.length} pages
            </CardContent>
          </Card>
        ))}
      </CardGroup>
    </>
 



  ); else return (
      <NotAuthorisedComponent />
  )

};

export default ProfilePage;