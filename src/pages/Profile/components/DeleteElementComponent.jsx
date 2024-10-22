import React, { useState } from "react";
import { 
  Icon,
  Confirm,
} from "semantic-ui-react";


const DeleteElementComponent = ({ executeDelete, type, name }) => {
  const [isHoveringDelete, setIsHoveringDelete] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);

  const handleDeleteConfirm = () => {
    setIsDeleteConfirmOpen(false);
    executeDelete();
  }

  return (
    <div>
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
        className="delete-confirm"
        open={isDeleteConfirmOpen}
        header={`Delete ${name}?`}
        content={`Are you sure you want to delete this ${type}? This action is irreversible.`}
        size={"small"}
        onConfirm={() => handleDeleteConfirm()}
        confirmButton={"Delete"}
        onCancel={() => setIsDeleteConfirmOpen(false)}
      />
    </div>
  )
}

export default DeleteElementComponent;