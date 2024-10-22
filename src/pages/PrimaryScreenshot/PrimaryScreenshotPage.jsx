import React, { useState } from "react";
import { Splitter, SplitterPanel } from 'primereact/splitter';

import ScreenshotUploadComponent from './components/ScreenshotUploadComponent/ScreenshotUploadComponent';
import NotAuthorisedComponent from '../shared/NotAuthorisedComponent';
import ResultsComponent from "./components/ResultsComponent/ResultsComponent";
import AIAnalysisComponent from "./components/AIAnalysisComponent/AIAnalysisComponent";

const PrimaryScreenshotPage = ({authorised}) => {
    const [imageUrl, setImageUrl] = useState('');

    if (authorised) return (

        <Splitter className="h-full">
            <SplitterPanel className="screenshot-upload-container" size={65} minSize={35}>
                <ScreenshotUploadComponent imageUrl={imageUrl} setImageUrl={setImageUrl} />
                <AIAnalysisComponent imageUrl={imageUrl} />
            </SplitterPanel>
            <SplitterPanel className="results-container" size={35} minSize={15}>
                <ResultsComponent imageUrl={imageUrl} />
            </SplitterPanel>
        </Splitter>

    ); else return (
        <NotAuthorisedComponent />
    )
};

export default PrimaryScreenshotPage;