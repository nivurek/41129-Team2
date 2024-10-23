import React from "react";
import {
  Image,
  Segment,
} from "semantic-ui-react";

import { useResult } from 'contexts/resultDataContext';

import DeleteElementComponent from "./DeleteElementComponent";

const ResultsListItemComponent = ({data, idx, active }) => {
	const { updateOpenResultIdx, updateResultData } = useResult();

  const resultSelectedHandler = () => {
    updateOpenResultIdx(idx);
    updateResultData(data);
  }
  
  return (
    <Segment onClick={() => resultSelectedHandler()} className={`results-list-item ${active ? 'active' : ''}`}>
      <div>
        <h3>Version {idx + 1}</h3>
        <p>{data.updated}</p>
      </div>
      
      <DeleteElementComponent elementId={data._id} elementIdx={idx} type="result" name={`Version ${idx + 1}`} />
      

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

export default ResultsListItemComponent;