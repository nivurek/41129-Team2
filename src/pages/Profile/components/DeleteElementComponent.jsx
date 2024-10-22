import React, { useState } from "react";
import {  Confirm } from "semantic-ui-react";
import { Button } from "primereact/button";

import { deleteResult } from "../actions/resultActions";
import { getUserById } from "actions/userActions";
import { useResultIdx } from 'contexts/openResultIdxContext';
import { useUser } from "contexts/userDataContext";
import { useParams } from "react-router-dom";


const DeleteElementComponent = ({ elementId, elementIdx, type, name }) => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { openResultIdx, updateOpenResultIdx } = useResultIdx();
  const { userData, updateUserData } = useUser();
  const { projectId, pageId } = useParams();

    // ============= Handler for the 'Delete Result' modal ==============
    const handleDeleteConfirm = () => {
      setIsDeleteConfirmOpen(false);

      if (!elementId) return;
  
      // Delete result
      deleteResult({
        userId: userData._id,
        projectId: projectId,
        pageId: pageId,
        resultId: elementId
      })
      .then((response) => {
        console.log("Result deleted:", response.data);
        return getUserById(userData._id);
      })
      .then((updatedData) => {
        console.log("Updated data:", updatedData);
        updateUserData(updatedData);

        var lastResultIdx = userData.projects.find(p => p._id === projectId).pages.find(pg => pg._id === pageId).results.length - 1;

        console.log(openResultIdx, elementIdx);

        if (openResultIdx === elementIdx) {
          updateOpenResultIdx(lastResultIdx - 1);
        } else if (openResultIdx > elementIdx) {
          updateOpenResultIdx(openResultIdx - 1);
        } else {
          updateOpenResultIdx(openResultIdx);
        }
      })
      .catch((error) => {
        console.error("Unexpected error:", error);
      });
    }

  return (
    <div className="delete-element-button">
      <Button rounded text icon="pi pi-trash" severity="danger" onClick={(e) => {setIsDeleteConfirmOpen(true); e.stopPropagation();}} />
      <Confirm
        className="delete-confirm"
        open={isDeleteConfirmOpen}
        header={`Delete ${name}?`}
        content={`Are you sure you want to delete this ${type}? This action is irreversible.`}
        size={"small"}
        onConfirm={() => handleDeleteConfirm()}
        confirmButton={"Delete"}
        onCancel={(e) => {setIsDeleteConfirmOpen(false); e.stopPropagation();}}
      />
    </div>
  )
}

export default DeleteElementComponent;