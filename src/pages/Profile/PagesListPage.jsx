import React, { useState, useEffect } from "react";
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
  Button,
  Card,
  CardMeta, 
  CardHeader, 
  CardContent, 
  Confirm,
  Form,
  Grid,
  Icon,
  Image,
  Input,
  Label,
  Modal,
  Placeholder,
  PlaceholderImage,
  Popup,
  Segment,
} from "semantic-ui-react";

import { useUser } from "../../contexts/userDataContext";

// import PageInformationComponent from "./PageInformationComponent";
// import DeleteElementComponent from "./DeleteElementComponent";
import NotAuthorisedComponent from "../shared/NotAuthorisedComponent";
import plusIcon from './assets/plusIcon.png';


const PagesListPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const userData = useUser();


	console.log("~~~~~STARTING PAGES LIST PAGE", userData);
	
	const [isNewPageConfirmOpen, setIsNewPageConfirmOpen] = useState(false);
	const { id: projectId } = useParams(); 
	console.log('gathered id is', projectId, "with project:", userData.projects);
	const projectData = userData.projects.find(project => project.id === projectId);
	
	console.log("Project data for this project:", projectData);

	const selectPage = (id) => {
    if (!(isNewPageConfirmOpen)) {
      const currentPath = location.pathname;
    	navigate(`${currentPath}/${id}/results`);
    }
  };

	const CardElement = ({page, idx, onClick}) => {
    return (
      <Card key={idx} onClick={onClick}>
				<Image
					src='https://replicate.delivery/mgxm/8b4d747d-feca-477d-8069-ee4d5f89ad8e/a_high_detail_shot_of_a_cat_wearing_a_suit_realism_8k_-n_9_.png'
					wrapped
					ui={false}
				/>

        <CardContent>
          <CardHeader>{page.name}</CardHeader>
          <CardMeta>
            <span className='date'>Last edited {page.updated}</span>
          </CardMeta>
        </CardContent>
        
        <CardContent extra>
          <Icon name='file' />
          {page.results.length} version{page.results.length === 1 ? '' : 's'}
        </CardContent>
      </Card>
    )
  };

	const AddNewPageCardElement = () => {
    return (
      <Card style={{ margin: '50px 7px 50px 20px' }} onClick={() => setIsNewPageConfirmOpen(true)}>
        <Image
          src={plusIcon}
          wrapped
          ui={true}
        />
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
        projectData.pages.push(
          {
						id: "444444444444444444", // fix this
            name: `${pageName}`,
            results: [
            ],
            updated: "2024-09-01", // fix this
          }
        );
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

	const handleDeletePage = ({id}) => {
    projectData.pages.splice(id, 1);
    // setOpenModalIdx(null);
    setIsNewPageConfirmOpen(false);
  }

	if (userData == {}) {
		return (
			<NotAuthorisedComponent/>
		)
	}

	return (
    <Segment.Group style={{width: '100%', height: '100%'}}>
      {/* ================================ Header ================================ */}
      <Segment secondary>
        <Grid className='alignedGrid' columns={3}>
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
        <h3>Pages</h3>
        <Card.Group>
          {projectData.pages.map((page, pageIndex) => (
						<CardElement page={page} idx={pageIndex} onClick={() => selectPage(page.id)} />
            // <Modal
            //   key={pageIndex}
            //   style={{ width: '90vw', position: 'relative' }}
            //   open={openModalIdx === pageIndex}
            //   dimmer={'blurring'}
            //   onClose={() => setOpenModalIdx(null)}
            //   onOpen={() => setOpenModalIdx(pageIndex)}
            //   trigger={
            //     <CardElement page={page} idx={pageIndex} onClick={() => setOpenModalIdx(pageIndex)} />
            //   }
            // >
            //   <Label
            //     as='a'
            //     color='orange'
            //     ribbon='right'
            //     onClick={() => setOpenModalIdx(null)}
            //     style={{ 
            //       fontSize: '15px',
            //       border: '1px solid black',
            //       paddingTop: '10px',
            //       position: 'absolute',
            //       top: '10px',
            //       left: 'calc(100% + 1rem + 0.35em)' // dont ask
            //     }}
            //   >
            //     Close Editor
            //     <Icon name='close' style={{ marginLeft: '10px' }} />
            //   </Label>

            //   <Modal.Header
            //     style={{
            //       paddingRight: '150px',
            //       backgroundColor: '#b5b5b5',
            //       borderBottom: '3px solid grey',
            //       display: 'flex',
            //       justifyContent: 'space-between',
            //       alignItems: 'center',
            //     }}
            //   >
            //     {page.name}
            //     <DeleteElementComponent executeDelete={handleDeletePage} type={"page"} name={page.name} />
            //   </Modal.Header>
              
            //   {/* Define Contents of Modal in PageInformationComponent */}
            //   <Modal.Content style={{backgroundColor: '#d4d2d2', height: '80vh', padding: '0px'}}>
            //     <PageInformationComponent pageInformation={page} />
            //   </Modal.Content>

            // </Modal>
          ))}
          <AddNewPageCardElement/>
          <AddNewPageConfirmer isOpen={isNewPageConfirmOpen} />
        </Card.Group>
      </Segment>
    </Segment.Group>
  )
};

export default PagesListPage;
