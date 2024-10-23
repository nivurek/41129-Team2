import React, { useState } from "react";
import {  Confirm } from "semantic-ui-react";
import { Button } from "primereact/button";

import { deleteVersion } from "actions/versionActions";
import { getUserById } from "actions/userActions";
import { useVersion } from 'contexts/versionDataContext';
import { useUser } from "contexts/userDataContext";
import { useParams } from "react-router-dom";


const DeleteElementComponent = ({ elementId, elementIdx, type }) => {
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const { openVersionIdx, updateOpenVersionIdx } = useVersion();
  const { userData, updateUserData } = useUser();
  const { projectId, pageId } = useParams();

    // ============= Handler for the 'Delete Version' modal ==============
    const handleDeleteConfirm = () => {
      setIsDeleteConfirmOpen(false);

      if (!elementId) return;
  
      // Delete version
      deleteVersion({
        userId: userData._id,
        projectId: projectId,
        pageId: pageId,
        versionId: elementId
      })
      .then((response) => {
        console.log("Version deleted:", response.data);
        return getUserById(userData._id);
      })
      .then((updatedData) => {
        console.log("Updated data:", updatedData);
        updateUserData(updatedData);

        var lastVersionIdx = userData.projects.find(p => p._id === projectId).pages.find(pg => pg._id === pageId).versions.length - 1;

        console.log(openVersionIdx, elementIdx);

        if (openVersionIdx === elementIdx) {
          updateOpenVersionIdx(lastVersionIdx - 1);
        } else if (openVersionIdx > elementIdx) {
          updateOpenVersionIdx(openVersionIdx - 1);
        } else {
          updateOpenVersionIdx(openVersionIdx);
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
        header={`Delete ${`Version ${elementIdx + 1}`}?`}
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