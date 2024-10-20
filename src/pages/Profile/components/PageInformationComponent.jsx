import React, { useState } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  Segment,
} from "semantic-ui-react";

import ResultPreviewComponent from "./ResultPreviewComponent";
import ResultInformationViewComponent from "./ResultInformationViewComponent";


const PageInformationComponent = ({pageInformation}) => {
  const [openResultIdx, setOpenResultIdx] = useState(pageInformation.results.length === 0 ? null : 0);

  // Need to update this meaningless counter when removing/renaming a result that doesnt affect the resultIndex, in order to force this component to update.
  // This will not be a problem when using a global data store that can be updated from any component.
  const [ , updateCounter] = useState(0);
  const addOneToCounter = () => {
    updateCounter(prevState => prevState + 1);
  }

  const createNewResult = () => {
    const date = new Date(Date.now());

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months start at 0
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');

    const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
    console.log(formattedDate);
    
    const newObject = {
      id: 999,
      screenshot: "",
      lastEditedDate: "",
      description: `Version ${pageInformation.results.length + 1}`,
      palettes: [
        {
          id: 999,
          hexColours: ["#FF5733", "#FFC300", "#DAF7A6"]
        }
      ]
    }
    pageInformation.results.push (newObject);
    setOpenResultIdx(pageInformation.results.length - 1)
  }

  return (
    <Grid className='alignedGrid'>
      <Grid.Row stretched style={{ height: '100%' }}>
        {/* ------------------------------------------------------------------ */}
        {(openResultIdx != null) ? (
          <ResultInformationViewComponent
            openResultIdx={openResultIdx}
            setOpenResultIdx={setOpenResultIdx}
            pageInformation={pageInformation}
            incrementCounter={addOneToCounter}
          />
        ) : (
          <Grid.Column width={10} style={{ height: 'inherit', paddingRight: '0px' }}>
            <div style={{ display: 'flex', flexDirection: 'column'}} >
              <h3>No result selected</h3>
            </div>
          </Grid.Column>
        )}
        {/* ------------------------------------------------------------------ */}
        <Grid.Column width={6} style={{ height: 'inherit' }}>
          <Segment
            style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}
          >
            <div>
              <h2 style={{textAlign: 'center'}}>Version History</h2>
            </div>
            <Divider/>
            <Button onClick={() => createNewResult()} style={{ margin: '10px', height: "70px" }}>
              {pageInformation.results.length === 0 ? "Get started!" : <Icon name='plus' />}
            </Button>

            <Container style={{ overflowY: 'auto', padding: '10px' }}>
              {pageInformation.results.map((result, resultIndex) => (
                <ResultPreviewComponent
                  key={resultIndex}
                  data={result}
                  idx={resultIndex}
                  active={openResultIdx === resultIndex}
                  setOpenResultIdx={setOpenResultIdx}
                />
              ))}
            </Container>
            
          </Segment>
        </Grid.Column>
        {/* ------------------------------------------------------------------ */}
      </Grid.Row>
    </Grid>
  )
};

export default PageInformationComponent;