import React, { useState } from "react";
import {
  Grid,
  Image,
  Segment,
  Transition
} from "semantic-ui-react";

const PageInformationComponent = ({pageInformation}) => {
  const [openResultIdx, setOpenResultIdx] = useState(pageInformation.results.length == 0 ? null : 0);

  const [animate, setAnimate] = useState(
    Array.from({ length: pageInformation.results.length }, () => true)
  );

  const toggleAnimate = (resultIndex) => {
    // Create a new array with the updated boolean value at the given index
    const updatedAnimate = animate.map((value, i) => i === resultIndex ? !value : value);

    // Update the result state with the modified array and select that version
    setOpenResultIdx(resultIndex);
    setAnimate(updatedAnimate);
  };

  return (
    <Grid className='alignedGrid'>
      <Grid.Row stretched style={{ height: '100%' }}>
        <Grid.Column width={10} style={{ height: 'inherit' }}>
            <Segment style={{ overflowY: 'auto' }}>
              {(openResultIdx != null) ? (
                  <>
                    <h3>{pageInformation.results[openResultIdx].description}</h3>
                    <Image src='https://react.semantic-ui.com/images/wireframe/image.png' fluid />
                  </>
              ) : (
                <h3>No result selected</h3>
              )}
            </Segment>
        </Grid.Column>
        {/* ------------------------------------------------------------------ */}
        <Grid.Column width={6}>
          <Segment style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
            <div>
              <h2 style={{textAlign: 'center'}}>Version History</h2>
            </div>
            <Grid
              className="alignedGrid"
              divided='vertically'
              style={{ flexGrow: 1, overflowY: 'auto' }} // Makes the grid take up remaining space
            >
              {pageInformation.results.map((result, resultIndex) => (
                <Grid.Row key={resultIndex} style={{maxHeight: '200px'}}>
                  <Transition
                    animation='pulse'
                    duration={100}
                    visible={animate[resultIndex]}
                  >
                    {(openResultIdx === resultIndex) ? (
                      <Segment
                        style={{ width: '100%', backgroundColor: '#a8a8a8' }}
                        secondary
                        onClick={()=>{toggleAnimate(resultIndex)}}
                      >
                        {result.description}
                      </Segment>
                    ) : (
                      <Segment
                        style={{ width: '100%' }}
                        secondary
                        onClick={()=>{toggleAnimate(resultIndex)}}
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
  )
};

export default PageInformationComponent;