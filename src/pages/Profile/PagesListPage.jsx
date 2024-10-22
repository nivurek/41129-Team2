import React, { useState } from "react";
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
  Popup,
  Segment,
} from "semantic-ui-react";

import { useUser } from 'contexts/userDataContext';
import withAuth from 'utils/withAuth';

import plusIcon from 'assets/plusIcon.png';


const PagesListPage = () => {
	const navigate = useNavigate();
	const location = useLocation();
	const { userData, updateUserData } = useUser();

	const [isNewPageConfirmOpen, setIsNewPageConfirmOpen] = useState(false);
	const { projectId } = useParams();
  console.log("Located projectid being:", projectId);
	const projectData = userData.projects.find(project => project._id === projectId);
	
	// console.log("Project data for this project:", projectData);

	const selectPage = (pageId) => {
    if (!(isNewPageConfirmOpen)) {
      const currentPath = location.pathname;
    	navigate(`${currentPath}/${pageId}`);
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

	return (
    <Segment.Group style={{width: '100%', height: '100%'}}>
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
        <h3>Pages</h3>
        <Card.Group>
          {projectData.pages.map((page, pageIndex) => (
						<CardElement key={pageIndex} page={page} idx={pageIndex} onClick={() => selectPage(page.id)} />
          ))}
          <AddNewPageCardElement/>
          <AddNewPageConfirmer isOpen={isNewPageConfirmOpen} />
        </Card.Group>
      </Segment>
    </Segment.Group>
  )
};

export default withAuth(PagesListPage);
