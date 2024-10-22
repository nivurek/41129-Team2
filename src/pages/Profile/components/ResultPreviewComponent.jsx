import React from "react";
import {
  Image,
  Segment,
} from "semantic-ui-react";

const ResultPreviewComponent = ({data, idx, active, setOpenResultIdx}) => {
  return (
    <Segment onClick={() => setOpenResultIdx(idx)} className={`results-list-item ${active ? 'active' : ''}`}>
      <h3>Version {idx + 1}</h3>
      <p>{data.updated}</p>

      {/* Thumbnail goes here */}
      {/* <Image
        size='tiny'
        spaced
        verticalAlign="middle"
        floated="right"
        src={'https://ralfvanveen.com/wp-content/uploads/2021/06/Placeholder-_-Glossary.svg'}
      /> */}
      
    </Segment>
  )
};

export default ResultPreviewComponent;