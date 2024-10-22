import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Grid,
  Icon,
  Input,
  Segment,
} from "semantic-ui-react";
import DeleteElementComponent from "./DeleteElementComponent";

import { useUser } from "contexts/userDataContext";
import { updateResult, deleteResult } from "../actions/resultActions";
import { getUserById } from "actions/userActions";


const ResultInformationViewComponent = ({openResultIdx, setOpenResultIdx, pageData, projectId}) => {

  const { userData, updateUserData } = useUser();
  const [isHoveringEdit, setIsHoveringEdit] = useState(false);
  const resultData = pageData.results[openResultIdx];
  console.log('RESULTINFORMATIONVIEWCOMPONENT', openResultIdx, resultData);

  // ============= Controls for the 'Delete Result' modal ==============
  const handleDeleteConfirm = () => {
    const newArrayLength = pageData.results.length - 1;
    setOpenResultIdx(
      newArrayLength === 0 ? null : Math.min(openResultIdx, newArrayLength - 1)
    );

    // Delete result
    deleteResult({
			userId: userData._id,
			projectId: projectId,
			pageId: pageData._id,
      resultId: resultData._id
		})
		.then((response) => {
			console.log("Result deleted:", response.data);
			return getUserById(userData._id);
		})
		.then((updatedData) => {
			console.log("Updated data:", updatedData);
			updateUserData(updatedData);
		})
		.catch((error) => {
			console.error("Unexpected error:", error);
		});
  }

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
            <div>
              <span style={{ fontWeight: 'bold', marginRight: '10px', fontSize: '20px' }}>
                {(openResultIdx != null) && resultData.description}
              </span>
              <Icon
                name="edit"
                circular
                inverted={isHoveringEdit}
                onClick={() => setIsEditingTitle(true)}
                // onMouseEnter={() => setIsHoveringEdit(true)}
                // onMouseLeave={() => setIsHoveringEdit(false)}
                disabled // TEMPORARILY DISBALED
              />
            </div>
          )}
          <DeleteElementComponent executeDelete={handleDeleteConfirm} type={"result"} name={resultData.description} />
        </div>
      </Segment>

      {/* =============================== BODY =============================== */}

      <div style={{ display: 'flex', flexDirection: 'column'}} >
        <Segment style={{ display: 'flex', flexGrow: 1, overflowY: 'auto', marginBottom: '0px'}}>
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
        </Segment>
      </div>
    </Grid.Column>
  )
}

export default ResultInformationViewComponent;