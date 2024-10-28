import React from "react";
import {
  Segment,
} from "semantic-ui-react";

import { ReactComponent as ImageNotFound } from 'assets/image_not_uploaded.svg';

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

      <div className="version-description expanded">
        <h3>Version {idx + 1}</h3>
        <p className="white-space-nowrap">{data.updated}</p>
      </div>
      <div className="version-description collapsed">
        <h3>V{idx + 1}</h3>
      </div>
      
      <div className="image-thumbnail">
        {data?.screenshotUrl ? 
          <img src={data.screenshotUrl} alt="No Image" />
          : 
          <ImageNotFound />
        }
        <DeleteElementComponent elementId={data._id} elementIdx={idx} type="version" />
      </div>
      
      
    </Segment>
  )
};

export default VersionsListItemComponent;