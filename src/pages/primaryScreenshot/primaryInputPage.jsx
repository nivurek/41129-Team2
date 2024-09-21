import React, { useState } from "react";

import ScreenshotUpload from './components/screenshotUploadComponent';
import NotAuthorised from '../shared/notAuthorisedComponent';
import Results from "./components/resultsComponent";

const Main = ({authorised}) => {
    const [results, setResults] = useState({});

    const updateResults = (data) => {
        setResults({...data});
    }

    if (authorised) return (

        <div className="grid h-full">
            <div className="col-8">
                <div className="screenshot-upload-container">
                    <ScreenshotUpload updateResults={updateResults} />
                </div>
            </div>
            <div className="col-4">
                <div className="results-container">
                    <Results results={results} />
                </div>
            </div>
        </div>

    ); else return (
        <NotAuthorised />
    )
};

export default Main;