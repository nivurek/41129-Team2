import React, { useState, useEffect } from "react";
import { Splitter, SplitterPanel } from 'primereact/splitter';
import { useParams } from 'react-router-dom';

import ScreenshotUploadComponent from './components/ScreenshotUploadComponent/ScreenshotUploadComponent';
import ColorResultsComponent from "./components/ColorResultsComponent/ColorResultsComponent";
import AIAnalysisComponent from "./components/AIAnalysisComponent/AIAnalysisComponent";
import AIPaywallComponent from "./components/AIPaywallComponent/AIPaywallComponent";

import { useVersion } from "contexts/versionDataContext";
import { useUser } from "contexts/userDataContext";

const ResultsComponent = ({isAuth}) => {
    const pathParams = useParams();
    const userContext = useUser();
    const versionContext = useVersion();

    const [imageUrl, setImageUrl] = useState('');

    // Generate path props for api calls
    const pathProps = {
        userId: userContext?.userData?._id,
        projectId: pathParams?.projectId,
        pageId: pathParams?.pageId,
        versionId: versionContext?.versionData?._id
    }

    useEffect(() => {
        setImageUrl(versionContext?.versionData?.screenshotUrl ?? '');
    }, [versionContext?.versionData])

    if (versionContext) {
        console.log("Loaded with context:", versionContext.versionData);
    } else {
        console.log("Loaded outside of version context provider");
    }

    return (
        <Splitter className="h-full">
            <SplitterPanel className="screenshot-upload-container" size={65} minSize={35}>
                <ScreenshotUploadComponent pathProps={pathProps} updateUserData={userContext.updateUserData} imageUrl={imageUrl} setImageUrl={setImageUrl} />
                
                {isAuth ? (
                    <AIAnalysisComponent imageUrl={imageUrl} />
                ) : imageUrl && (
                    <AIPaywallComponent />
                )}

            </SplitterPanel>
            <SplitterPanel className="results-container" size={35} minSize={15}>
                <ColorResultsComponent imageUrl={imageUrl} />
            </SplitterPanel>
        </Splitter>
    )
};

export default ResultsComponent;