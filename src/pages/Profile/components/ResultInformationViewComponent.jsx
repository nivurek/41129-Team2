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

const ResultInformationViewComponent = ({openResultIdx, setOpenResultIdx, pageInformation}) => {

  const [isHoveringEdit, setIsHoveringEdit] = useState(false);
  const [isHoveringDelete, setIsHoveringDelete] = useState(false);

  const localData = pageInformation.results[openResultIdx];

  // ===================================================================
  // ============= Controls for the 'Delete Result' modal ==============
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);

    const newArrayLength = pageInformation.results.length - 1;

    setOpenResultIdx(
      newArrayLength === 0 ? null : Math.min(openResultIdx, newArrayLength - 1)
    );

    pageInformation.results.splice(openResultIdx, 1);
  }


  // ===================================================================
  // =========== Controls for changing the name of a result ============
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [inputValue, setInputValue] = useState(openResultIdx ? localData.description : "");
  
  // Watch openResultIdx and results and auto-update the form value.
  useEffect(() => {
    if (openResultIdx !== null && localData) {
      setInputValue(localData.description);
    }
    setIsEditingTitle(false);
  }, [openResultIdx, pageInformation.results]); 

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    setInputValue(localData.description);
    setIsEditingTitle(false);
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    // NEEDS PROPER DATABASE INTERACTION
    pageInformation.results[openResultIdx].description = inputValue; // Temporary solution
    setIsEditingTitle(false);
  };
  // ===================================================================

  return (
    <Grid.Column width={10} style={{ height: 'inherit', paddingRight: '0px' }}>
      {/* =============================== HEADER =============================== */}
      <Segment style={{ maxHeight: '72px', backgroundColor: '#b5b8ff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isEditingTitle ? (
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
                {(openResultIdx != null) && localData.description}
              </span>
              <Icon
                name="edit"
                circular
                inverted={isHoveringEdit}
                onMouseEnter={() => setIsHoveringEdit(true)}
                onMouseLeave={() => setIsHoveringEdit(false)}
                onClick={() => setIsEditingTitle(true)}
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
            className="deleteConfirm"
            open={isDeleteConfirmOpen}
            header={`Delete ${localData.description}?`}
            content={"Are you sure you want to delete this result? This action is irreversible."}
            size={"small"}
            onConfirm={() => handDeleteConfirm()}
            confirmButton={"Delete"}
            onCancel={() => setIsDeleteConfirmOpen(false)}
          />
        </div>
      </Segment>

      {/* =============================== BODY =============================== */}

      <div style={{ display: 'flex', flexDirection: 'column'}} >
        <Segment style={{ display: 'flex', flexGrow: 1, overflowY: 'auto', marginBottom: '0px'}}>
          {localData.screenshot != "" ? (
            <div>
              Screenshot data goes here
            </div>
          ) : (
            <Button>
              {"(Screenshot uploader goes here)"}
            </Button>
          )}
          
        </Segment>
        <Segment style={{ display: 'flex', flexGrow: 1, overflowY: 'auto'}}>
          <div>
            AI Generated data goes here
          </div>
        </Segment>
      </div>
    </Grid.Column>
  )
}

export default ResultInformationViewComponent;