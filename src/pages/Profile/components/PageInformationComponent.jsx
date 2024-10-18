import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  Input,
  Image,
  Label,
  Segment,
  Confirm,
} from "semantic-ui-react";
import ResultPreviewComponent from "./ResultPreviewComponent";

const PageInformationComponent = ({pageInformation}) => {
  const [openResultIdx, setOpenResultIdx] = useState(pageInformation.results.length == 0 ? null : 0);
  const [hoveringEdit, setHoveringEdit] = useState(false);
  const [hoveringDelete, setHoveringDelete] = useState(false);

  // ===================================================================
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handDeleteConfirm = () => {
    // Handle delete here
    setIsDeleteConfirmOpen(false);
  }

  const changeOpenResult = (value) => {
    setEditingTitle(false)
    setOpenResultIdx(value);
  }
  // ===================================================================
  // Local state for the input value
  const [editingTitle, setEditingTitle] = useState(false);
  const [inputValue, setInputValue] = useState(openResultIdx ? pageInformation.results[openResultIdx].description : "");
  // useEffect to watch for changes in openResultIdx and update inputValue
  useEffect(() => {
    if (openResultIdx !== null && pageInformation.results[openResultIdx]) {
      setInputValue(pageInformation.results[openResultIdx].description);
    }
  }, [openResultIdx, pageInformation.results]); // Dependency array watches openResultIdx and results

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    setInputValue(pageInformation.results[openResultIdx].description);
    setEditingTitle(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // NEEDS PROPER DATABASE INTERACTION
    pageInformation.results[openResultIdx].description = inputValue; // Temporary solution
    setEditingTitle(false);
  };
  // ===================================================================

  console.log('openres', openResultIdx);

  return (
    <Grid className='alignedGrid'>
      <Grid.Row stretched style={{ height: '100%' }}>
        <Grid.Column width={10} style={{ height: 'inherit' }}>

          {(openResultIdx != null) && (
            <Segment style={{ maxHeight: '72px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              {editingTitle ? (
                <form onSubmit={handleSubmit} style={{ display: 'flex', alignItems: 'center' }}>
                  <Input
                    value={inputValue}
                    onChange={handleInputChange}
                    placeholder="Edit description"
                    style={{ marginRight: '10px' }} // Add some margin to the input
                  />
                  <Icon name="check" circular type="submit" onClick={handleSubmit} />
                  <Icon name="cancel" circular onClick={(e) => cancelEdit(e)} /> {/* Cancel button */}
                </form>
              ) : (
                <div>
                  <span style={{ fontWeight: 'bold', marginRight: '10px', fontSize: '20px' }}>
                    {(openResultIdx != null) && pageInformation.results[openResultIdx].description}
                  </span>
                  <Icon
                    name="edit"
                    circular
                    inverted={hoveringEdit}
                    onMouseEnter={() => setHoveringEdit(true)}
                    onMouseLeave={() => setHoveringEdit(false)}
                    onClick={() => setEditingTitle(true)}
                  />
                </div>
              )}
              
              <Icon
                name="trash"
                size="large"
                circular
                inverted={hoveringDelete}
                color="red"
                onClick={() => setIsDeleteConfirmOpen(true)}
                onMouseEnter={() => setHoveringDelete(true)}
                onMouseLeave={() => setHoveringDelete(false)}
              />
              <Confirm
                open={isDeleteConfirmOpen}
                onConfirm={() => handDeleteConfirm()}
                onCancel={() => setIsDeleteConfirmOpen(false)}
              />
            </div>
          </Segment>
          )}
          
          <Segment style={{ overflowY: 'auto' }}>
            
            {(openResultIdx != null) ? (
                <div>
                  <Image src='https://react.semantic-ui.com/images/wireframe/image.png' fluid />
                </div>
            ) : (
              <h3>No result selected</h3>
            )}
          </Segment>
        </Grid.Column>
        {/* ------------------------------------------------------------------ */}
        <Grid.Column width={6} style={{ height: 'inherit' }}>
          <Segment
            style={{ display: 'flex', flexDirection: 'column', height: '100%', overflowY: 'auto' }}
          >
            <div>
              <h2 style={{textAlign: 'center'}}>Version History</h2>
            </div>
            <Divider/>
            <Button style={{ margin: '10px' }}>
              {pageInformation.results.length == 0 ? "Get started!" : <Icon name='plus' />}
            </Button>

            <Container style={{ overflowY: 'auto', padding: '10px' }}>
              {pageInformation.results.map((result, resultIndex) => (
                <ResultPreviewComponent
                  key={resultIndex}
                  data={result}
                  idx={resultIndex}
                  active={openResultIdx == resultIndex}
                  setOpenResultIdx={changeOpenResult}
                />
              ))}
            </Container>
          </Segment>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  )
};

export default PageInformationComponent;