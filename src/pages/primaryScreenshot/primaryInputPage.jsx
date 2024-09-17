import React from "react";

import ScreenshotUpload from './components/ScreenshotUploadComponent'
import NotAuthorised from '../shared/NotAuthorisedComponent'
import ResultsComponent from './components/ResultsComponent'


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