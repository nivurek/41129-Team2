import React, { useState } from "react";
import { Button } from "semantic-ui-react";

const PageListComponent = ({pageData, changeDepth, setIndex}) => {
  console.log("===== Pagelistcomponent =====");
  
  const returnUpALevel = () => {
    changeDepth(0);
  }
  
  return (
    <>
      <p>PageListComponent</p>
      <Button onClick={()=>{returnUpALevel()}}>
        Go back
      </Button>
    </>
  )
};

export default PageListComponent;