import React, { useEffect, useState } from 'react';
import * as Vibrant from 'node-vibrant';

import ColorPaletteComponent from './components/ColorPaletteComponent';
import ColorContrastComponent from './components/ColorContrastComponent';

const ColorResultsComponent = ({imageUrl}) => {

    const [imageColorPalette, updateImageColorPalette] = useState({});

    const processVibrantData = (palette) => {
        if (Object.keys(palette).length === 0) return;
        delete palette.LightMuted;

        const processedPalette = {
            vibrant: palette.Vibrant?.hex,
            lightVibrant: palette.LightVibrant?.hex,
            darkVibrant: palette.DarkVibrant?.hex,
            muted: palette.Muted?.hex,
            darkMuted: palette.DarkMuted?.hex
        };

        updateImageColorPalette({ ...processedPalette });
    }

    useEffect(() => {
        if (!imageUrl) { updateImageColorPalette({}); return; }
        Vibrant.from(imageUrl).quality(1).getPalette((err, palette) => { processVibrantData(palette); });
        // Set user.project[id].page[id].result[id].screenshot to imageUrl
    }, [imageUrl]);

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

export default ColorResultsComponent;
