import React, { useState } from "react";
import {
  Button,
  Card,
  CardMeta, 
  CardHeader, 
  CardDescription, 
  CardContent, 
  Grid,
  Icon,
  Image,
  Segment,
  Modal,
  Transition
} from "semantic-ui-react";

const PageListComponent = ({pageData, projectName, changeDepth, setIndex}) => {
  console.log("===== Pagelistcomponent =====", pageData);

  const [openModalIdx, setOpenModalIdx] = useState(null); // Track which modal is open
  const [openResultIdx, setOpenResultIdx] = useState(null); // Track which result is selected
  const [activeResultData, setActiveResultData] = useState(null)

  const selectModal = (idx) => {
    setOpenModalIdx(idx); // Set the modal to the clicked index
    console.log("----------debug | idx", idx);

    if (idx) { // When opening a modal, automatically select the top result
      setActiveResultData(pageData.pages[idx]?.results.length ? pageData.pages[idx].results[0] : null);
      setOpenResultIdx(pageData.pages[idx]?.results.length ? 0 : null)
    } else { // When closing a modal, reset animation flags to true
      setAnimate(
        Array.from({ length: pageData.pages.length }, (_, idx) => 
          Array.from({ length: pageData.pages[idx].results.length }, () => true))
      )
    }
  };
  
  const returnUpALevel = () => {
    changeDepth(0);
  }


  const CardElement = ({page, idx, onClick}) => {
    return (
      <Card key={idx} onClick={onClick}>
        <Image src='https://replicate.delivery/mgxm/8b4d747d-feca-477d-8069-ee4d5f89ad8e/a_high_detail_shot_of_a_cat_wearing_a_suit_realism_8k_-n_9_.png' wrapped ui={false} />
        <CardContent>
          <CardHeader>{page.name}</CardHeader>
          <CardMeta>
            <span className='date'>Last edited {page.lastEditedDate}</span>
          </CardMeta>
          {/* <CardDescription>
            {page.Description}
          </CardDescription> */}
        </CardContent>
        <CardContent extra>
          <Icon name='file' />
          {page.results.length} versions
        </CardContent>
      </Card>
    )
  }
  // =========================================================================================================================
  // Create an array of arrays of booleans for handling animation triggers. The actual values in this array are not important.
  // Please don't ask. I'm scared.
  const [animate, setAnimate] = useState(
    Array.from({ length: pageData.pages.length }, (_, idx) => 
      Array.from({ length: pageData.pages[idx].results.length }, () => true)
    )
  );
  
  const toggleAnimate = (pageIndex, resultIndex) => {
    // Create a new array by copying the existing state
    const updatedAnimate = animate.map((page, idx) => {
      if (idx === pageIndex) {
        // If it's the correct page, map through its results and toggle the correct result
        return page.map((value, i) => (i === resultIndex ? !value : value));
      }
      // For other pages, just return the original array
      return page;
    });
    // Update the result state with the modified array and select that version
    setOpenResultIdx(resultIndex);
    setActiveResultData(pageData.pages[pageIndex].results[resultIndex]);
    setAnimate(updatedAnimate);
  };
  // =========================================================================================================================
  console.log('foccused data', openModalIdx, openResultIdx);
  
  
  return (
    <Segment.Group style={{width: "100%", height: "100%"}}>
      <Segment secondary>
        <Grid columns={3}>
          <Grid.Column width={3}>
            <Button
              onClick={()=>{returnUpALevel()}}
              icon
              labelPosition='left'
            >
              <Icon name={'arrow left'} />
              Go back
            </Button>
          </Grid.Column>
          <Grid.Column width={10}>
            <h1 style={{textAlign: "center"}}>{projectName} - Pages</h1>
          </Grid.Column>
          <Grid.Column width={3}>

          </Grid.Column>
        </Grid>
      </Segment>
      {/* ========================================================== */}
      <Segment style={{height: "100%"}}>
        <h3>Pages</h3>
        <Card.Group>
          {pageData.pages.map((page, pageIndex) => (
            <Modal
              style={{width: "80vw"}}
              open={openModalIdx === pageIndex}
              dimmer={'blurring'}
              onClose={() => selectModal(null)}
              onOpen={() => selectModal(pageIndex)}
              trigger={<CardElement page={page} idx={pageIndex} onClick={() => selectModal(pageIndex)} />}
            >
              <Modal.Header style={{backgroundColor: "#b5b5b5", borderBottom: "3px solid grey"}}>
                {page.name}
              </Modal.Header>
              <Modal.Content style={{backgroundColor: "#d4d2d2", height: "70vh", padding: "0px"}}>
                <Grid className="alignedGrid">
                  <Grid.Row stretched>
                    <Grid.Column width={10}>
                        <Segment>
                          <Image src='https://react.semantic-ui.com/images/wireframe/image.png' fluid />
                          {(openModalIdx != null) && (openResultIdx != null) && (
                              <h3>{pageData.pages[openModalIdx].results[openResultIdx].description}</h3>
                          )}
                        </Segment>
                    </Grid.Column>
                    {/* ------------------------------------------------------------------ */}
                    <Grid.Column width={6}>
                      <Segment style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                        <div>
                          <h2 style={{textAlign: "center"}}>Version History</h2>
                        </div>
                        <Grid
                          className="alignedGrid"
                          divided='vertically'
                          style={{ flexGrow: 1, overflowY: 'auto' }} // Makes the grid take up remaining space
                        >
                          {page.results.map((result, resultIndex) => (
                            <Grid.Row key={resultIndex} style={{maxHeight: "200px"}}>
                              <Transition
                                animation="pulse"
                                duration={100}
                                visible={animate[pageIndex][resultIndex]}
                              >
                                {(openResultIdx === resultIndex) ? (
                                  <Segment
                                    style={{ width: "100%", backgroundColor: "#a8a8a8" }}
                                    secondary
                                    onClick={()=>{toggleAnimate(pageIndex, resultIndex)}}
                                  >
                                    {result.description}
                                  </Segment>
                                ) : (
                                  <Segment
                                    style={{ width: "100%" }}
                                    secondary
                                    onClick={()=>{toggleAnimate(pageIndex, resultIndex)}}
                                  >
                                    {result.description}
                                  </Segment>
                                )}
                                
                              </Transition>
                            </Grid.Row>
                          ))}
                        </Grid>
                      </Segment>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Modal.Content>
            </Modal>
          ))}
        </Card.Group>
      </Segment>
    </Segment.Group>
  )
};

export default PageListComponent;