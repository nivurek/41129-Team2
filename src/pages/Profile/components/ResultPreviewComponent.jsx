import React, { useState } from "react";
import {
  Image,
  Segment,
} from "semantic-ui-react";

const ResultPreviewComponent = ({data, idx, active, setOpenResultIdx}) => {

  return (
    <Segment
      key={idx}
      onClick={() => setOpenResultIdx(idx)}
      style={{
        height: "100px",
        backgroundColor: active ? "#c4ffde" : undefined, 
      }}
    >

      {data.description}
      <Image
        size='tiny'
        spaced
        verticalAlign="middle"
        floated="right"
        src={'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg'}
      />
    </Segment>
  )
};

export default ResultPreviewComponent;