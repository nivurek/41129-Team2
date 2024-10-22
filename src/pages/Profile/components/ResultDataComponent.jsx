import React, { useState, useEffect } from "react";
import {
  Form,
  Grid,
  Icon,
  Input,
  Segment,
} from "semantic-ui-react";
import { Button } from "primereact/button";

import { useResultIdx } from 'contexts/openResultIdxContext';

import DeleteElementComponent from "./DeleteElementComponent";
import ResultsComponent from "pages/shared/Results/ResultsComponent";


const ResultDataComponent = ({ pageData }) => {

  const { openResultIdx } = useResultIdx();
  const resultData = pageData.results[openResultIdx] ?? {};
  console.log('ResultInformationViewComponent', resultData);

  // =========== Controls for changing the name of a result ============ 
  //-----------------------TEMPORARILY DISABLED-------------------------

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [inputValue, setInputValue] = useState(openResultIdx ? resultData.description : "");
  
  // Watch openResultIdx and results and auto-update the form value.
  useEffect(() => {
    if (openResultIdx !== null && resultData) {
      setInputValue(resultData.description);
    }
    setIsEditingTitle(false);
  }, [openResultIdx, pageData.results, resultData]); 

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    setInputValue(resultData.description);
    setIsEditingTitle(false);
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // NEEDS PROPER DATABASE INTERACTION
    pageData.results[openResultIdx].description = inputValue; // Temporary solution
    setIsEditingTitle(false);
  };
  // ===================================================================

  return (
    <Grid.Column width={10} style={{ height: 'inherit', paddingRight: '0px' }}>
      {/* =============================== HEADER =============================== */}
      <Segment style={{ maxHeight: '72px', backgroundColor: '#b5b8ff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {isEditingTitle ? (
            <Form onSubmit={handleEditSubmit} style={{ display: 'flex', alignItems: 'center' }}>
              <Input
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Edit description"
                style={{ marginRight: '10px' }}
              />
              <Icon name="check" circular type="submit" onClick={handleEditSubmit} />
              <Icon name="cancel" circular onClick={(e) => cancelEdit(e)} />
            </Form>
          ) : (
            <div className="flex flex-nowrap align-items-center">
              <span style={{ fontWeight: 'bold', marginRight: '10px', fontSize: '20px' }}>
                {(openResultIdx != null) ? (
                  resultData.updated
                ) : (
                  "No result selected"
                ) }
              </span>
              <Button text size="small" icon="pi pi-pencil" severity="secondary" onClick={() => setIsEditingTitle(true)} disabled />
            </div>
          )}
          <DeleteElementComponent elementId={resultData._id} type={"result"} name={`Version ${openResultIdx + 1}`} />
        </div>
      </Segment>

      {/* =============================== BODY =============================== */}

      <div style={{ display: 'flex', flexDirection: 'column'}} >
        {/* <Segment style={{ display: 'flex', flexGrow: 1, overflowY: 'auto', marginBottom: '0px'}}>
          {resultData.screenshot !== "" ? (
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
        </Segment> */}
        <ResultsComponent isAuth={true} />
      </div>
    </Grid.Column>
  )
}

export default ResultDataComponent;