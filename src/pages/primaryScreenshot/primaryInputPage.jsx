import React, { useState } from "react";
import { Splitter, SplitterPanel } from 'primereact/splitter';

import ScreenshotUploadComponent from './components/ScreenshotUploadComponent';
import NotAuthorisedComponent from '../shared/NotAuthorisedComponent';
import ResultsComponent from "./components/ResultsComponent";

const PrimaryInputComponent = ({authorised}) => {
    const [imageColorPalette, updateImageColorPalette] = useState({});

    if (authorised) return (

        <Splitter className="h-full">
            <SplitterPanel className="screenshot-upload-container" size={65} minSize={35}>
                <ScreenshotUploadComponent updateImageColorPalette={updateImageColorPalette} />
            </SplitterPanel>
            <SplitterPanel className="results-container" size={35} minSize={15}>
                <ResultsComponent imageColorPalette={imageColorPalette} />
            </SplitterPanel>
        </Splitter>

    ); else return (
        <NotAuthorisedComponent />
    )
};

export default PrimaryInputComponent;