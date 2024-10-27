import React, { useState } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
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
} from "semantic-ui-react";

import { useUser } from 'contexts/userDataContext';
import withAuth from 'utils/withAuth';
import { createPage, updatePage, deletePage } from "actions/pageActions";
import { getUserById } from "actions/userActions";

import { ReactComponent as ImageNotFound } from 'assets/image_not_uploaded.svg';
import plusIcon from 'assets/plusIcon.png';


const PagesListPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { userData, updateUserData } = useUser();

	const [isNewPageConfirmOpen, setIsNewPageConfirmOpen] = useState(false);
  const [isDeleteConfirmOpenIdx, setIsDeleteConfirmOpenIdx] = useState(null);
  const [renamingId, setRenamingId] = useState(null);
  const [renameValue, setRenameValue] = useState("");
  
	const { projectId } = useParams();
	const projectData = userData.projects.find(project => project._id === projectId);
  console.log("Project data PAGES COMP:", projectData);

	const selectPage = (pageId) => {
    if (!(isDeleteConfirmOpenIdx || (renamingId === pageId))) {
      const currentPath = location.pathname;
    	navigate(`${currentPath}/${pageId}`);
    }
  };

  const handleDeleteConfirm = (pageId) => {
    setIsDeleteConfirmOpenIdx(null);
    deletePage({
      userId: userData._id,
      projectId: projectId,
      pageId: pageId,
    })
    .then((response) => {
      console.log("Page deleted:", response.data);
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

  const handleStartEdit = (page) => {
    setRenamingId(page._id);
    setRenameValue(page.name);
  }

  const handleEditSubmit = (e, pageId) => {
    e.preventDefault();
    if (renameValue !== "") {
      // Rename page
      updatePage({
        userId: userData._id,
        projectId: projectId,
        pageId: pageId,
        newPageName: renameValue,
      })
      .then((response) => {
        console.log("Page renamed:", response.data);
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

	const AddNewPageCardElement = () => {
    return (
      <Card style={{ margin: '50px 7px 50px 7px' }} onClick={() => setIsNewPageConfirmOpen(true)}>
        <img src={plusIcon} />
        <CardContent style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CardHeader>Add new page</CardHeader>
        </CardContent>
      </Card>
    )
  };

	const AddNewPageConfirmer = ({ isOpen }) => {
    const [pageName, setPageName] = useState('');
    const [isError, setIsError] = useState(false);

    const handleFormChange = (e) => {
      setPageName(e.target.value);
      if (isError) {
        setIsError(false);
      }
    }
  
    const addNewPage = () => {
      if (pageName === "") {
        setIsError(true);
      } else {
        setPageName('');
        
        createPage({
          userId: userData._id,
          projectId: projectId,
          pageName: pageName,
        })
        .then((response) => {
          console.log("Page created:", response.data);
          return getUserById(userData._id);
        })
        .then((updatedData) => {
          console.log("Updated data:", updatedData);
          updateUserData(updatedData);
        })
        .catch((error) => {
          console.error("Unexpected error:", error);
        });
        
        setIsNewPageConfirmOpen(false);
      }
    };

		return (
      <Confirm
        open={isOpen}
        onConfirm={() => {
          addNewPage();
        }}
        onCancel={() => setIsNewPageConfirmOpen(false)}
        header={"Give your new page a name!"}
        content={
          <Form>
            <Form.Field>
              <Popup
                content={"New page must have a name"}
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
                    placeholder='Enter page name...' 
                    value={pageName} 
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

  function getLatestScreenshotUrl(page) {
    // Filter out versions with empty screenshotUrl and sort by updated in descending order
    const validVersions = page.versions
        .filter(version => version.screenshotUrl !== "")
        .map(({ updated, screenshotUrl }) => ({ updated, screenshotUrl }))
        .sort((a, b) => new Date(b.updated) - new Date(a.updated));
    
    // Return the screenshotUrl of the most recent valid version, or null if none exist
    console.log("For page:", page.name, "Screenshots valid are:", validVersions);
    return validVersions.length > 0 ? validVersions[0].screenshotUrl : null;
  }

	return (
    <Segment.Group style={{ display: 'flex', flexGrow: '1' }}>
      {/* ================================ Header ================================ */}
      <Segment secondary>
        <Grid className='aligned-grid' columns={3}>
          <Grid.Column width={3}>
            <Button
              onClick={()=>{navigate(-1)}}
              icon
              labelPosition='left'
            >
              <Icon name={'arrow left'} />
              Go back
            </Button>
          </Grid.Column>
          <Grid.Column width={10}>
            <h1 style={{textAlign: 'center'}}>{projectData.name} - Pages</h1>
          </Grid.Column>
        </Grid>
      </Segment>
      {/* ================================ Card List ================================ */}
      <Segment style={{height: '100%'}}>
        <Card.Group>
          {projectData.pages.map((page, pageIndex) => (
            <Card key={pageIndex} onClick={() => selectPage(page._id)}>
              <div className="image-thumbnail" >
                {(getLatestScreenshotUrl(page) !== null) ? 
                  <img src={ getLatestScreenshotUrl(page) } />
                  : 
                  <ImageNotFound />
                }
              </div>
              
              <CardContent style={{ paddingBottom: '100px' }}>
                {/* ================================================================== */}
                <CardHeader style={{ display: 'flex', justifyContent: 'space-between' }}>
                  {renamingId === page._id ? (
                    <Form
                      onBlur={(e) => {
                        // Cancel form if the focus is leaving to a target OUTSIDE the form (not including the button) (idk how this works)
                        if (!e.currentTarget.contains(e.relatedTarget)) {
                          setRenamingId(null);
                        }
                      }}
                      onSubmit={(e) => {
                        handleEditSubmit(e, page._id);
                      }}
                      style={{ display: 'flex', alignItems: 'center', width: '85%' }}
                    >
                      <Input
                        value={renameValue}
                        onChange={handleInputChange}
                        placeholder="Name this page"
                        autoFocus
                        action={
                          <Button
                            icon={<Icon name="check" />}
                            color="green"
                            onClick={(e) => {
                              handleEditSubmit(e, page._id);
                            }}
                          />
                        }
                      />
                    </Form>
                  ) : (
                    <div>
                      <span style={{ fontWeight: 'bold', marginRight: '10px', fontSize: '20px' }}>
                        {page.name}
                      </span>
                    </div>
                  )}
                  {(renamingId !== page._id) && (
                    <Dropdown icon={<Icon name="ellipsis vertical" />}>
                      <Dropdown.Menu>
                        <Dropdown.Item icon={'edit'} text={"Rename"} onClick={() => handleStartEdit(page)} />
                        <Dropdown.Item icon={'trash'} text={"Delete"} onClick={() => setIsDeleteConfirmOpenIdx(page._id)} />
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
                  <Confirm
                    className="delete-confirm"
                    open={isDeleteConfirmOpenIdx === page._id}
                    header={`Delete ${page.name}?`}
                    content={"Are you sure you want to delete this page? This action is irreversible."}
                    size={"small"}
                    onConfirm={() => handleDeleteConfirm(page._id)}
                    onCancel={()=> setIsDeleteConfirmOpenIdx(null)}
                    confirmButton={"Delete"}
                  />
                </CardHeader>

                {/* ====================================================================================================== */}

                <CardMeta>
                  <span className='date'>Last edited {page.updated}</span>
                </CardMeta>

                {/* ====================================================================================================== */}

              </CardContent>
              <CardContent extra>
                <Icon name='file' />
                {page.versions.length} version{page.versions.length === 1 ? '' : 's'}
              </CardContent>
            </Card>
          ))}
          <AddNewPageCardElement/>
          <AddNewPageConfirmer isOpen={isNewPageConfirmOpen} />
        </Card.Group>
      </Segment>
    </Segment.Group>
  )
};

export default withAuth(PagesListPage);
