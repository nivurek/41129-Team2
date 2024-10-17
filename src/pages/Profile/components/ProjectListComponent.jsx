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

const ProjectListComponent = ({projectData, changeDepth, setIndex}) => {

  const selectProject = (id) => {
    console.log("Clicked on project index", id);
    setIndex(id);
    changeDepth(1);
  };

  return (
    <Card.Group>
        {projectData.map((project, idx) => (
          <Card key={idx} onClick={() => selectProject(idx)}>
            <Image src='https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' wrapped ui={false} />
            <CardContent>
              <CardHeader>{project.name}</CardHeader>
              <CardMeta>
                <span className='date'>Last edited {project.lastEditedDate}</span>
              </CardMeta>
              <CardDescription>
                {project.description}
              </CardDescription>
            </CardContent>
            <CardContent extra>
              <Icon name='file' />
              {project.pages.length} pages
            </CardContent>
          </Card>
        ))}
      </Card.Group>
  )
};

export default ProjectListComponent;