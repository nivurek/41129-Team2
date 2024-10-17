import React, { useState } from "react";
import { 
  CardMeta, 
  CardHeader, 
  CardDescription, 
  CardContent, 
  Card, 
  Icon, 
  Image
} from 'semantic-ui-react';
import NotAuthorisedComponent from '../shared/NotAuthorisedComponent';
import ProjectListComponent from "./components/ProjectListComponent";
import PageListComponent from "./components/PageListComponent";
import PageInformationComponent from "./components/PageInformationComponent";


const ProfilePage = ({authorised, userData}) => {
  
  console.log('Entered profile page with userdata:', userData);

  const [userProjects, _] = useState(userData?.projects);

  // Infodepth determins which view we are looking at.
  // 0 -> Project list
  // 1 -> Page list for a project
  // 2 -> Page info (screenshots, results)
  const [infoDepth, setInfoDepth] = useState(0);
  const [projectIndex, setProjectIndex] = useState(0);
  const [pageIndex, setPageIndex] = useState(0);

  console.log("Depth", infoDepth, "| ProjIndx", projectIndex, "| PageIndx", pageIndex);
  
  

  if (authorised && (userData != null)) return (
    <div style={{padding: "10px"}}>
      {infoDepth == 0 && (
        <ProjectListComponent projectData={userProjects} changeDepth={setInfoDepth} setIndex={setProjectIndex}/>
      )}
      {infoDepth == 1 && (
        <PageListComponent pageData={userProjects[projectIndex]} projectName={userProjects[projectIndex].name} changeDepth={setInfoDepth} setIndex={setPageIndex} />
      )}
      {infoDepth == 2 && (
        <PageInformationComponent pageInformation={userProjects[projectIndex][pageIndex]} changeDepth={setInfoDepth} />
      )}
    </div>

  ); else return (
      <NotAuthorisedComponent />
  )

};

export default ProfilePage;