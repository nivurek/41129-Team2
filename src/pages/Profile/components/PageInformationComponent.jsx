import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Divider,
  Grid,
  Icon,
  Input,
  Image,
  Segment,
  Confirm,
} from "semantic-ui-react";
import ResultPreviewComponent from "./ResultPreviewComponent";

const PageInformationComponent = ({pageInformation}) => {
  const [openResultIdx, setOpenResultIdx] = useState(pageInformation.results.length == 0 ? null : 0);
  const [isHoveringEdit, setIsHoveringEdit] = useState(false);
  const [isHoveringDelete, setIsHoveringDelete] = useState(false);

  // ===================================================================
  // ============= Controls for the 'Delete Result' modal ==============
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
  }

  const changeOpenResult = (value) => {
    setEditingTitle(false)
    setOpenResultIdx(value);
  }
  // ===================================================================
  // =========== Controls for changing the name of a result ============
  const [editingTitle, setEditingTitle] = useState(false);
  const [inputValue, setInputValue] = useState(openResultIdx ? pageInformation.results[openResultIdx].description : "");
  
  // Watch openResultIdx and results and auto-update the form value.
  useEffect(() => {
    if (openResultIdx !== null && pageInformation.results[openResultIdx]) {
      setInputValue(pageInformation.results[openResultIdx].description);
    }
  }, [openResultIdx, pageInformation.results]); 

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

  console.log('openResultIdx', openResultIdx);

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
                    style={{ marginRight: '10px' }}
                  />
                  <Icon name="check" circular type="submit" onClick={handleSubmit} />
                  <Icon name="cancel" circular onClick={(e) => cancelEdit(e)} />
                </form>
              ) : (
                <div>
                  <span style={{ fontWeight: 'bold', marginRight: '10px', fontSize: '20px' }}>
                    {(openResultIdx != null) && pageInformation.results[openResultIdx].description}
                  </span>
                  <Icon
                    name="edit"
                    circular
                    inverted={isHoveringEdit}
                    onMouseEnter={() => setIsHoveringEdit(true)}
                    onMouseLeave={() => setIsHoveringEdit(false)}
                    onClick={() => setEditingTitle(true)}
                  />
                </div>
              )}
              
              <Icon
                name="trash"
                size="large"
                circular
                inverted={isHoveringDelete}
                color="red"
                onClick={() => setIsDeleteConfirmOpen(true)}
                onMouseEnter={() => setIsHoveringDelete(true)}
                onMouseLeave={() => setIsHoveringDelete(false)}
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