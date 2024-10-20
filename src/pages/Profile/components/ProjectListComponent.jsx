import React, { useState } from "react";
import { 
  CardMeta, 
  CardHeader, 
  CardDescription, 
  CardContent, 
  Card, 
  Icon, 
  Image,
  Confirm,
  Form,
  Input,
  Popup,
} from 'semantic-ui-react';
import plusIcon from '../assets/plusIcon.png';

const ProjectListComponent = ({projectData, changeDepth, setIndex}) => {

  const [isNewProjectConfirmOpen, setIsNewProjectConfirmOpen] = useState(false);
  console.log('PROJECTDATA', projectData);
  

  const selectProject = (id) => {
    console.log("Clicked on project index", id);
    setIndex(id);
    changeDepth(1);
  };

  const AddNewProjectCardElement = () => {
    return (
      <Card style={{ margin: '50px 7px 50px 20px' }} onClick={() => setIsNewProjectConfirmOpen(true)}>
        <Image
          src={plusIcon}
          wrapped
          ui={true}
        />
        <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CardHeader>Add new project</CardHeader>
        </CardContent>
      </Card>
    )
  }

  const AddNewProjectConfirmer = ({ isOpen }) => {
    const [projectName, setProjectName] = useState('');
    const [isError, setIsError] = useState(false);

    const handleFormChange = (e) => {
      setProjectName(e.target.value);
      if (isError) {
        setIsError(false);
      }
    }
  
    const addNewProject = () => {
      if (projectName == "") {
        setIsError(true);
      } else {
        setProjectName('');
        projectData.push(
          {
            name: `${projectName}`,
            description: "",
            pages: [],
            createdDate: "2024-09-01",
            lastEditedDate: "2024-09-01",
          }
        );
        setIsNewProjectConfirmOpen(false);
      }
    };
  
    return (
      <Confirm
        open={isOpen}
        onConfirm={() => {
          addNewProject();
        }}
        onCancel={() => setIsNewProjectConfirmOpen(false)}
        header={"Give your new project a name!"}
        content={
          <Form>
            <Form.Field>
              <Popup
                content={"New project must have a name"}
                open={isError}
                position='bottom left'
                style={{
                  color: 'red',
                  fontWeight: 'bold',
                  width: '15em',
                  position: 'absolute',
                  top: '-1em',
                  left: '1em',
                 }}
                trigger={
                  <Input 
                    placeholder='Enter project name...' 
                    value={projectName} 
                    error={isError}
                    onChange={(e) => handleFormChange(e)} 
                    style={{ padding: '10px' }}
                  />
                }
              />
              
            </Form.Field>
          </Form>
        }
      />
    );
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
              {project.pages.length} page{project.pages.length === 1 ? '' : 's'}
            </CardContent>
          </Card>
        ))}
        <AddNewProjectCardElement/>
        <AddNewProjectConfirmer isOpen={isNewProjectConfirmOpen} />
      </Card.Group>
  )
};

export default ProjectListComponent;