import React from "react";

import ScreenshotUpload from '/src/components/screenshotUploadComponent'
import NotAuthorised from '/src/components/notAuthorisedComponent'
import ResultsComponent from '/src/components/resultsComponent'


const Main = ({authorised}) => {
  
  

  if (authorised) return (
    <div className="page-container">
        <div className="screenshot-upload-container">
            <ScreenshotUpload />
        </div>
        <div className="results-container">
            <ResultsComponent />
        </div>
    </div>
    
  ); else return (
    <NotAuthorised />
  )
};

export default Main;