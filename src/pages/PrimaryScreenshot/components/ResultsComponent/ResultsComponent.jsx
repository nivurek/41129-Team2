import React from 'react';
import _ from 'lodash';

import ColorPaletteComponent from './components/ColorPaletteComponent';
import ColorContrastComponent from './components/ColorContrastComponent';

const ResultsComponent = ({imageColorPalette}) => {

    // Rendered Component
    if (Object.keys(imageColorPalette).length > 0) return (

        <div>
            <h1>Results</h1>
            <ColorPaletteComponent imageColorPalette={imageColorPalette} />
            <ColorContrastComponent />
        </div>

    ); else return (
        <div className="mx-4 my-auto">
            <h2>Upload a screenshot on the left to start your ChromaUX journey...</h2>
        </div>
    )
};

export default ResultsComponent;
