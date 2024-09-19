import React, { useState } from "react";

import ScreenshotUploadComponent from './components/ScreenshotUploadComponent'
import NotAuthorised from '../shared/NotAuthorisedComponent'
import ResultsComponent from './components/ResultsComponent'


const Main = ({authorised}) => {
    const [results, setResults] = useState({});

    const updateResults = (data) => {
        setResults({...data});
    }

    if (authorised) return (

        <div className="grid h-full">
            <div className="col-8">
                <div className="screenshot-upload-container">
                    <ScreenshotUploadComponent updateResults={updateResults} />
                </div>
            </div>
            <div className="col-4">
                <div className="results-container">
                    <ResultsComponent results={results} />
                </div>
            </div>
        </div>

    ); else return (
        <NotAuthorised />
    )
};

export default Main;