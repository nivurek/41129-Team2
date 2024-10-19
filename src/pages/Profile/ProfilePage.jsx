import React, { useState } from "react";

import NotAuthorisedComponent from '../shared/NotAuthorisedComponent';
import ProjectListComponent from "./components/ProjectListComponent";
import PageListComponent from "./components/PageListComponent";
import PageInformationComponent from "./components/PageInformationComponent";


const ProfilePage = ({authorised, userData}) => {
  
  console.log('Profile Data:', userData);

  const [userProjects, _] = useState(userData?.projects);

  // Infodepth determins which view we are looking at.
  // 0 -> Project list
  // 1 -> Page list for a project
  const [infoDepth, setInfoDepth] = useState(0);

  // Project index keeps track of which project we are focused on.
  const [projectIndex, setProjectIndex] = useState(0);

  console.log("Depth", infoDepth, "| ProjIndx", projectIndex);
  
  if (authorised && (userData != null)) return (
    <div style={{padding: "10px", height: "100%"}}>
      {infoDepth == 0 && (
        <ProjectListComponent
          projectData={userProjects}
          changeDepth={setInfoDepth}
          setIndex={setProjectIndex}
        />
      )}
      {infoDepth == 1 && (
        <PageListComponent
          projectData={userProjects[projectIndex]}
          projectName={userProjects[projectIndex].name}
          changeDepth={setInfoDepth}
        />
      )}
    </div>

  ); else return (
      <NotAuthorisedComponent />
  )

};

export default ProfilePage;