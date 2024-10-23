import React from "react";
import {
  Image,
  Segment,
} from "semantic-ui-react";

import { useVersion } from 'contexts/versionDataContext';

import DeleteElementComponent from "./DeleteElementComponent";

const VersionsListItemComponent = ({data, idx, active }) => {
	const { updateOpenVersionIdx, updateVersionData } = useVersion();

  const versionSelectedHandler = () => {
    updateOpenVersionIdx(idx);
    updateVersionData(data);
  }

  return (
    <Segment onClick={() => versionSelectedHandler()} className={`versions-list-item ${active ? 'active' : ''}`}>
      <div>
        <h3>Version {idx + 1}</h3>
        <p>{data.updated}</p>
      </div>
      
      <DeleteElementComponent elementId={data._id} elementIdx={idx} type="version" name={`Version ${idx + 1}`} />
      

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

export default VersionsListItemComponent;