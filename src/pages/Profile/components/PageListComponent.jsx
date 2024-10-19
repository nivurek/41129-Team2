import React, { useState, useEffect } from "react";
import {
  Button,
  Card,
  CardMeta, 
  CardHeader, 
  CardContent, 
  Confirm,
  Form,
  Input,
  Grid,
  Icon,
  Image,
  Segment,
  Modal,
  Placeholder,
  PlaceholderImage,
  Label,
} from "semantic-ui-react";
import PageInformationComponent from "./PageInformationComponent";
import plusIcon from '../assets/plusIcon.png';

const PageListComponent = ({projectData, projectName, changeDepth}) => {
  console.log("===== Pagelistcomponent =====", projectData);

  const [openModalIdx, setOpenModalIdx] = useState(null); // Track which modal is open.
  const [isNewPageConfirmOpen, setIsNewPageConfirmOpen] = useState(false);

  const [loadingData, setLoadingData] = useState( // Potentially useless but could be cool.
    Array.from({ length: projectData.length }, () => true)
  )

  const returnToProjectList = () => {
    console.log("returnToProjectList");
    changeDepth(0);
  }

  const CardElement = ({page, idx, onClick}) => {

    useEffect(() => {
      // Simulate loading for 2 seconds - this will be replaced by an async fetch request for the actual image
      const timer = setTimeout(() => {
        console.log("useEffect");
        if (loadingData[idx] == false) {
          setLoadingData(loadingData.map((value, i) => i === idx ? !value : value));
        }
      }, 2000);
  
      // Cleanup the timer when component unmounts
      return () => clearTimeout(timer);
    }, []); // Empty dependency array to run this effect only once after mount

    return (
      <Card key={idx} onClick={onClick}>

        {loadingData[idx] ? (
          <Placeholder>
            <PlaceholderImage square/>
          </Placeholder>
        ) : (
          <Image
            src='https://replicate.delivery/mgxm/8b4d747d-feca-477d-8069-ee4d5f89ad8e/a_high_detail_shot_of_a_cat_wearing_a_suit_realism_8k_-n_9_.png'
            wrapped
            ui={false}
          />
        )}

        <CardContent>
          <CardHeader>{page.name}</CardHeader>
          <CardMeta>
            <span className='date'>Last edited {page.lastEditedDate}</span>
          </CardMeta>
        </CardContent>
        
        <CardContent extra>
          <Icon name='file' />
          {page.results.length} version{page.results.length === 1 ? '' : 's'}
        </CardContent>
        
      </Card>
    )
  }

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
  }

  const addNewPage = () => {
    console.log('confirmed');
    
  }

  const AddNewPageConfirmer = ({ isOpen }) => {
    const [pageName, setPageName] = useState('');
  
    const addNewPage = () => {
      console.log("New page name:", pageName);
      setPageName('');
      projectData.pages.push(
        {
          "name": `${pageName}`,
          "lastEditedDate": "2024-09-01", // fix this
          "results": [
          ]
        }
      );
    };
  
    return (
      <Confirm
        open={isOpen}
        onConfirm={() => {
          addNewPage();
          setIsNewPageConfirmOpen(false);
        }}
        onCancel={() => setIsNewPageConfirmOpen(false)}
        header={"Give your new page a name!"}
        content={
          <Form>
            <Form.Field>
              <Input 
                placeholder='Enter page name...' 
                value={pageName} 
                onChange={(e) => setPageName(e.target.value)} 
                style={{ padding: '10px' }}
              />
            </Form.Field>
          </Form>
        }
      />
    );
  };
  
  console.log('Open Modal Index:', openModalIdx);
  
  return (
    <Segment.Group style={{width: '100%', height: '100%'}}>
      <Segment secondary>
        <Grid className='alignedGrid' columns={3}>
          <Grid.Column width={3}>
            <Button
              onClick={()=>{returnToProjectList()}}
              icon
              labelPosition='left'
            >
              <Icon name={'arrow left'} />
              Go back
            </Button>
          </Grid.Column>
          <Grid.Column width={10}>
            <h1 style={{textAlign: 'center'}}>{projectName} - Pages</h1>
          </Grid.Column>
          <Grid.Column width={3}>

          </Grid.Column>
        </Grid>
      </Segment>
      {/* ========================================================== */}
      <Segment style={{height: '100%'}}>
        <h3>Pages</h3>
        <Card.Group>
          {/* Each page will be represented by a 'Card' which itself is the trigger for a popup modal. */}
          {projectData.pages.map((page, pageIndex) => (
            <Modal
              key={pageIndex}
              style={{ width: '90vw', position: 'relative' }}
              open={openModalIdx === pageIndex}
              dimmer={'blurring'}
              onClose={() => setOpenModalIdx(null)}
              onOpen={() => setOpenModalIdx(pageIndex)}
              trigger={
                <CardElement page={page} idx={pageIndex} onClick={() => setOpenModalIdx(pageIndex)} />
              }
            >
              <Label
                as='a'
                color='orange'
                ribbon='right'
                onClick={() => setOpenModalIdx(null)}
                style={{ 
                  fontSize: '15px',
                  border: '1px solid black',
                  paddingTop: '10px',
                  position: 'absolute',
                  top: '10px',
                  left: 'calc(100% + 1rem + 0.35em)' // dont ask
                }}
              >
                Close Editor
                <Icon name='close' style={{ marginLeft: '10px' }} color="white" />
              </Label>

              <Modal.Header
                style={{
                  backgroundColor: '#b5b5b5',
                  borderBottom: '3px solid grey',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                {page.name}
              </Modal.Header>
              
              {/* Define Contents of Modal in PageInformationComponent */}
              <Modal.Content style={{backgroundColor: '#d4d2d2', height: '80vh', padding: '0px'}}>
                <PageInformationComponent pageInformation={page} />
              </Modal.Content>

            </Modal>
          ))}
          <AddNewPageCardElement/>
          <AddNewPageConfirmer isOpen={isNewPageConfirmOpen} />
        </Card.Group>
      </Segment>
    </Segment.Group>
  )
};

export default PageListComponent;