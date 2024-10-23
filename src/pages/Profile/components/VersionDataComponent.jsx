import React, { useState, useEffect } from "react";
import {
  Form,
  Grid,
  Icon,
  Input,
  Segment,
} from "semantic-ui-react";
import { Button } from "primereact/button";

import { useVersion } from 'contexts/versionDataContext';

import DeleteElementComponent from "./DeleteElementComponent";
import ResultsComponent from "pages/shared/Results/ResultsComponent";


const VersionDataComponent = ({ pageData }) => {

  const { openVersionIdx, versionData } = useVersion();
  
  console.log('VersionDataComponent', versionData);

  // =========== Controls for changing the name of a version ============ 
  //-----------------------TEMPORARILY DISABLED-------------------------

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [inputValue, setInputValue] = useState(openVersionIdx ? versionData.description : "");
  
  // Watch openVersionIdx and versions and auto-update the form value.
  useEffect(() => {
    if (openVersionIdx !== null && versionData) {
      setInputValue(versionData.description);
    }
    setIsEditingTitle(false);
  }, [openVersionIdx, versionData, pageData.versions]); 

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };

  const cancelEdit = (e) => {
    e.preventDefault();
    setInputValue(versionData.description);
    setIsEditingTitle(false);
  }

  const handleEditSubmit = (e) => {
    e.preventDefault();
    // NEEDS PROPER DATABASE INTERACTION
    pageData.versions[openVersionIdx].description = inputValue; // Temporary solution
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
                {(openVersionIdx != null) ? (
                  versionData.updated
                ) : (
                  "No version selected"
                ) }
              </span>
              <Button text size="small" icon="pi pi-pencil" severity="secondary" onClick={() => setIsEditingTitle(true)} disabled />
            </div>
          )}
          <DeleteElementComponent elementId={versionData._id} type={"version"} name={`Version ${openVersionIdx + 1}`} />
        </div>
      </Segment>

      {/* =============================== BODY =============================== */}

      <div style={{ display: 'flex', flexDirection: 'column'}} >
        {/* <Segment style={{ display: 'flex', flexGrow: 1, overflowY: 'auto', marginBottom: '0px'}}>
          {versionData.screenshot !== "" ? (
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

export default VersionDataComponent;