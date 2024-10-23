import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';

import { updateVersionHelper } from "utils/api.helper";

const enableGemini = process.env.REACT_APP_ENABLE_GEMINI || false;

const AIAnalysisComponent = ({ versionProps, imageUrl }) => {
    const { path, updateUserData, versionData } = versionProps;
    const [analysis, setAnalysis] = useState('');

    useEffect(() => {
        if (!imageUrl) {
            setAnalysis('');
            return;
        } else if (versionData?.analysis) {
            setAnalysis(versionData.analysis);
            return;
        } else if (enableGemini) {
            analyzeWithGemini(imageUrl);
        }
    }, [imageUrl]);

    const analyzeWithGemini = async (imageUrl) => {
        try {
            const response = await fetch('http://localhost:5001/upload-to-gemini', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                fileUri: imageUrl,
                mimeType: 'image/jpeg',
            }),
            });
        
            if (!response.ok) throw new Error('Failed to analyze with Gemini API');
        
            const result = await response.json();
            setAnalysis(result.analysis); 

            // If there is a version, update the version with the new image
            if (versionData) {
                updateVersionHelper(path, { analysis: result.analysis })
                    .then((updatedUserData) => updateUserData(updatedUserData));
            }
        
        } catch (error) {
            console.error('Error analyzing UI/UX with Gemini API:', error);
        }
    };

    return (
    <div>
        {analysis && (
            <div className="analysis-result">
            <h3>AI Analysis Result:</h3>
                <ReactMarkdown>{analysis}</ReactMarkdown>
            </div>
        )}
    </div>
    );
};

export default AIAnalysisComponent;
