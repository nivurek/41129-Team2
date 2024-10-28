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


const VersionDataComponent = () => {

  const { openVersionIdx, versionData } = useVersion();

  // =========== Controls for changing the name of a version ============ 
  //-----------------------TEMPORARILY DISABLED-------------------------

  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [inputValue, setInputValue] = useState(versionData ? versionData.description : "");
  
  // Watch versions and auto-update the form value.
  useEffect(() => {
    if (versionData) {
      setInputValue(versionData.description);
    }
    setIsEditingTitle(false);
  }, [versionData]); 

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
    // pageData.versions[openVersionIdx].description = inputValue; // Temporary solution
    setIsEditingTitle(false);
  };
  // ===================================================================

  return (
    <>
      {/* =============================== HEADER =============================== */}
      <Segment style={{ maxHeight: '72px', backgroundColor: '#b5b8ff' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {/* {isEditingTitle ? (
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
          ) : ( */}
          {/* <Button text size="small" icon="pi pi-pencil" severity="secondary" onClick={() => setIsEditingTitle(true)} disabled /> */}
          {/* )} */}

          <div className="flex flex-nowrap align-items-center">
            {(openVersionIdx != null) ? (
              <>
              <span style={{ fontWeight: 'bold', marginRight: '15px', fontSize: '20px' }}>{"Version " + (openVersionIdx + 1)}</span>
              <small style={{ lineHeight: '1.5rem' }}>Last updated: {versionData?.updated}</small>
              </>
            ) : (
              <span style={{ fontWeight: 'bold', marginRight: '15px', fontSize: '20px' }}>No Version Selected</span>
            ) }
          </div>

          <DeleteElementComponent elementId={versionData?._id} elementIdx={openVersionIdx} type={"version"} />
        </div>
      </Segment>

      {/* =============================== BODY =============================== */}

      <div className="flex flex-column min-h-0 h-full" >
        {(openVersionIdx != null) ? (
          <ResultsComponent isAuth={true} />
        ) : (
          <div className="no-version-container">
            <h2 style={{color: '#aaaaaa'}}>Select a version or create a new one to start your ChromaUX Journey...</h2>
          </div>
        )}
      </div>
    </>
  )
}

export default VersionDataComponent;