import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { 
  CardMeta, 
  CardHeader, 
  CardContent, 
  Card, 
  Icon, 
  Image,
  Confirm,
  Form,
  Input,
  Popup,
  Dropdown,
  Button,
} from 'semantic-ui-react';

import { useUser } from "../../contexts/userDataContext";

import plusIcon from './assets/plusIcon.png';
import NotAuthorisedComponent from "../shared/NotAuthorisedComponent";


const ProjectsListPage = () => {
  const navigate = useNavigate();
  const userData = useUser();

	console.log('user data -------', userData);

  const [projectData, ] = useState(userData?.projects ?? []);

	const [isNewProjectConfirmOpen, setIsNewProjectConfirmOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [renamingIndex, setRenamingIndex] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  const selectProject = (id) => {
    if (!(isDeleteConfirmOpen || (renamingIndex === id))) {
      console.log('goto project:', id);
      navigate(`/projects/${id}`);
    }
  };

  const handleDeleteConfirm = (id) => {
    setIsDeleteConfirmOpen(false);
    projectData.splice(id, 1);
  }

  const handleStartEdit = (idx) => {
    setRenamingIndex(idx);
    setRenameValue(projectData[idx].name);
  }

  const handleEditSubmit = (e, idx) => {
    e.preventDefault();
    if (renameValue !== "") {
      projectData[idx].name = renameValue; // Temporary solution
      setRenamingIndex(null);
    } else {
      // Could create a warning box to let user know the name cant be empty
    }
  };

  const handleInputChange = (e) => {
    setRenameValue(e.target.value);
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
      if (isError) { setIsError(false); }
    }
  
    const addNewProject = () => {
      if (projectName === "") {
        setIsError(true);
      } else {
        setProjectName('');
        projectData.push(
          {
            id: "1111111111111111", // fix this
            name: `${projectName}`,
            pages: [],
            updated: "uhhhh, today?", // yeah also fix this
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

  console.log("preflight", userData);
  
  if (userData == {}) {
    console.log("UNSAFE");
    
		return (
			<NotAuthorisedComponent/>
		)
	}

  return (
    <Card.Group>
      {projectData.map((project, idx) => (
        <Card key={idx} onClick={() => selectProject(project.id)}>
          <Image src='https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg' wrapped ui={false} />
          <CardContent>
            {/* ====================================================================================================== */}
            <CardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
              {renamingIndex === idx ? (
                <Form
                  onBlur={(e) => {
                    // Cancel form if the focus is leaving to a target OUTSIDE the form (not including the button) (idk how this works)
                    if (!e.currentTarget.contains(e.relatedTarget)) {
                      setRenamingIndex(null);
                    }
                  }}
                  onSubmit={(e) => {
                    handleEditSubmit(e, idx);
                  }}
                  style={{ display: 'flex', alignItems: 'center', width: '85%' }}
                >
                  <Input
                    value={renameValue}
                    onChange={handleInputChange}
                    placeholder="Name this project"
                    autoFocus
                    action={
                      <Button
                        icon={<Icon name="check" />}
                        color="green"
                        onClick={(e) => {
                          handleEditSubmit(e, idx);
                        }}
                      />
                    }
                  />
                </Form>
              ) : (
                <div>
                  <span style={{ fontWeight: 'bold', marginRight: '10px', fontSize: '20px' }}>
                    {project.name}
                  </span>
                </div>
              )}
              {(renamingIndex !== idx) && (
                <Dropdown icon={<Icon name="ellipsis vertical"  />}>
                  <Dropdown.Menu>
                    <Dropdown.Item icon={'edit'} text={"Rename"} onClick={() => handleStartEdit(idx)} />
                    <Dropdown.Item icon={'trash'} text={"Delete"} onClick={() => setIsDeleteConfirmOpen(true)} />
                  </Dropdown.Menu>
                </Dropdown>
              )}
              <Confirm
                className="deleteConfirm"
                open={isDeleteConfirmOpen}
                header={`Delete ${project.name}?`}
                content={`Are you sure you want to delete this project? This action is irreversible.`}
                size={"small"}
                onConfirm={() => handleDeleteConfirm(idx)}
                onCancel={()=> setIsDeleteConfirmOpen(false)}
                confirmButton={"Delete"}
              />
            </CardHeader>

            {/* ====================================================================================================== */}
            
            <CardMeta>
              <span className='date'>Last edited {project.updated}</span>
            </CardMeta>

            {/* <CardDescription>
              {project.description}
            </CardDescription> */}

            {/* ====================================================================================================== */}
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

export default ProjectsListPage;
