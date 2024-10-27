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
    <Grid.Column width={10} style={{ height: 'inherit', paddingRight: '0px' }}>
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
            <div className="flex flex-nowrap align-items-center">
                <span style={{ fontWeight: 'bold', marginRight: '15px', fontSize: '20px' }}>
                  {(openVersionIdx != null) ? (
                    "Version " + (openVersionIdx + 1)
                  ) : (
                    "No version selected"
                  ) }
                </span>
                <small style={{ lineHeight: '1.5rem' }}>Last updated: {versionData?.updated}</small>
              </div>
              {/* <Button text size="small" icon="pi pi-pencil" severity="secondary" onClick={() => setIsEditingTitle(true)} disabled /> */}
          {/* )} */}
          <DeleteElementComponent elementId={versionData?._id} elementIdx={openVersionIdx} type={"version"} />
        </div>
      </Segment>

      {/* =============================== BODY =============================== */}

      <div className="flex flex-column min-h-0" >
        <ResultsComponent isAuth={true} />
      </div>
    </Grid.Column>
  )
}

export default VersionDataComponent;