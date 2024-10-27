import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { 
  Button,
  Card,
  CardMeta,
  CardHeader,
  CardContent,
  Confirm,
  Dropdown,
  Form,
  Grid,
  Icon,
  Image,
  Input,
  Popup,
  Segment,
} from 'semantic-ui-react';

import { useUser } from "contexts/userDataContext";
import withAuth from "utils/withAuth";
import { createProject, updateProject, deleteProject } from "actions/projectActions";
import { getUserById } from "actions/userActions";

import { ReactComponent as ImageNotFound } from 'assets/image_not_uploaded.svg';
import plusIcon from 'assets/plusIcon.png';


const ProjectsListPage = () => {
  const navigate = useNavigate();
  const { userData, updateUserData } = useUser();

  const projectData = userData.projects ?? [];

	const [isNewProjectConfirmOpen, setIsNewProjectConfirmOpen] = useState(false);
  const [isDeleteConfirmOpenIdx, setIsDeleteConfirmOpenIdx] = useState(null);
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");

  const selectProject = (projectId) => {
    if (!(isDeleteConfirmOpenIdx || (renamingId === projectId))) {
      console.log('goto project:', projectId);
      navigate(`/projects/${projectId}`);
    }
  };

  const handleDeleteConfirm = (projectId) => {
    setIsDeleteConfirmOpenIdx(null);
    deleteProject({
      userId: userData._id,
      projectId: projectId,
    })
    .then((response) => {
      console.log("Project deleted:", response.data);
      return getUserById(userData._id);
    })
    .then((updatedData) => {
      console.log("Updated data:", updatedData);
      updateUserData(updatedData);
    })
    .catch((error) => {
      console.error("Unexpected error:", error);
    });
  }

  const handleStartEdit = (project) => {
    setRenamingId(project._id);
    setRenameValue(project.name);
  }

  const handleEditSubmit = (e, projectId) => {
    e.preventDefault();
    if (renameValue !== "") {
      // Rename project
      updateProject({
        userId: userData._id,
        projectId: projectId,
        newProjectName: renameValue,
      })
      .then((response) => {
        console.log("Project renamed:", response.data);
        return getUserById(userData._id);
      })
      .then((updatedData) => {
        console.log("Updated data:", updatedData);
        updateUserData(updatedData);
      })
      .catch((error) => {
        console.error("Unexpected error:", error);
      });

      setRenamingId(null);
    } else {
      // Could create a warning box to let user know the name cant be empty
    }
  };

  const handleInputChange = (e) => {
    setRenameValue(e.target.value);
  };

  const AddNewProjectCardElement = () => {
    return (
      <Card style={{ margin: '50px 7px 50px 7px' }} onClick={() => setIsNewProjectConfirmOpen(true)}>
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

        createProject({
          userId: userData._id,
          projectName: projectName,
        })
        .then((response) => {
          console.log("Project created:", response.data);
          return getUserById(userData._id);
        })
        .then((updatedData) => {
          console.log("Updated data:", updatedData);
          updateUserData(updatedData);
        })
        .catch((error) => {
          console.error("Unexpected error:", error);
        });

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

  function getMostRecentScreenshotUrl(project) {
    let latestScreenshot = null;

    project.pages.forEach(page => {
        const validVersions = page.versions
            .filter(version => version.screenshotUrl !== "")
            .map(({ updated, screenshotUrl }) => ({ updated, screenshotUrl }))
            .sort((a, b) => new Date(b.updated) - new Date(a.updated));
        
        // Check if this page has a valid screenshot, and if it's more recent than the current latest
        if (validVersions.length > 0) {
            const mostRecentVersion = validVersions[0];
            if (!latestScreenshot || new Date(mostRecentVersion.updated) > new Date(latestScreenshot.updated)) {
                latestScreenshot = mostRecentVersion;
            }
        }
        
        console.log("For page:", page.name, "Screenshots valid are:", validVersions);
    });

    return latestScreenshot ? latestScreenshot.screenshotUrl : null;
  }

  return (
    <Segment.Group style={{ display: 'flex', flexGrow: '1' }}>
      {/* ================================ Header ================================ */}
      <Segment secondary>
        <Grid className='aligned-grid' columns={3}>
          <Grid.Column width={3}>
            {/* <Button
              onClick={()=>{navigate(-1)}}
              icon
              labelPosition='left'
            >
              <Icon name={'arrow left'} />
              Go back
            </Button> */}
          </Grid.Column>
          <Grid.Column width={10}>
            <h1 style={{textAlign: 'center'}}>{userData.username} - Projects</h1>
          </Grid.Column>
        </Grid>
      </Segment>
      {/* ================================ Card List ================================ */}
      <Segment style={{ height: '100%' }}>
        <Card.Group>
          {projectData.map((project, idx) => (
            <Card key={idx} onClick={() => selectProject(project._id)}>
              <div className="image-thumbnail" >
                {(getMostRecentScreenshotUrl(project) !== null) ? 
                  <img src={ getMostRecentScreenshotUrl(project) } wrapped ui={false}/>
                  : 
                  <ImageNotFound />
                }
              </div>
              <CardContent>
                {/* ====================================================================================================== */}
                <CardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {renamingId === project._id ? (
                    <Form
                      onBlur={(e) => {
                        // Cancel form if the focus is leaving to a target OUTSIDE the form (not including the button) (idk how this works)
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                          setRenamingId(null);
                        }
                      }}
                      onSubmit={(e) => {
                        handleEditSubmit(e, project._id);
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
                              handleEditSubmit(e, project._id);
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
                  {(renamingId !== project._id) && (
                    <Dropdown icon={<Icon name="ellipsis vertical" />}>
                      <Dropdown.Menu>
                        <Dropdown.Item icon={'edit'} text={"Rename"} onClick={() => handleStartEdit(project)} />
                        <Dropdown.Item icon={'trash'} text={"Delete"} onClick={() => setIsDeleteConfirmOpenIdx(project._id)} />
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                  <Confirm
                    className="delete-confirm"
                    open={isDeleteConfirmOpenIdx === project._id}
                    header={`Delete ${project.name}?`}
                    content={"Are you sure you want to delete this project? This action is irreversible."}
                    size={"small"}
                    onConfirm={() => handleDeleteConfirm(project._id)}
                    onCancel={()=> setIsDeleteConfirmOpenIdx(null)}
                    confirmButton={"Delete"}
                  />
                </CardHeader>

                {/* ====================================================================================================== */}
                
                <CardMeta>
                  <span className='date'>Last edited {project.updated}</span>
                </CardMeta>

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
      </Segment>
    </Segment.Group>

    
  )
};

export default withAuth(ProjectsListPage);
