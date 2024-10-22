import React, { useState } from "react";
import { Splitter, SplitterPanel } from 'primereact/splitter';

import ScreenshotUploadComponent from './components/ScreenshotUploadComponent/ScreenshotUploadComponent';
import ColorResultsComponent from "./components/ColorResultsComponent/ColorResultsComponent";
import AIAnalysisComponent from "./components/AIAnalysisComponent/AIAnalysisComponent";
import NotAuthorisedComponent from 'pages/shared/NotAuthorisedComponent';


const ResultsComponent = ({authorised}) => {
    const [imageUrl, setImageUrl] = useState('');

    return (
        <Splitter className="h-full">
            <SplitterPanel className="screenshot-upload-container" size={65} minSize={35}>
                <ScreenshotUploadComponent imageUrl={imageUrl} setImageUrl={setImageUrl} />
                <AIAnalysisComponent imageUrl={imageUrl} />
            </SplitterPanel>
            <SplitterPanel className="results-container" size={35} minSize={15}>
                <ColorResultsComponent imageUrl={imageUrl} />
            </SplitterPanel>
        </Splitter>
    )
};

export default ResultsComponent;