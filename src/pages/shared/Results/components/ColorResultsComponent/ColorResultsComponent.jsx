import React, { useEffect, useState } from 'react';
import * as Vibrant from 'node-vibrant';
import { Divider } from 'primereact/divider';

import { updateVersionHelper } from 'utils/api.helper';

import ColorPaletteComponent from './components/ColorPaletteComponent';
import ColorContrastComponent from './components/ColorContrastComponent';

const ColorResultsComponent = ({versionProps, imageUrl}) => {
    const { path, updateUserData, versionData } = versionProps;
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

        // If there is a path to a version, update the version with the new image - try catch block used because no try catch higher up
        if (versionData) try {
            updateVersionHelper(path, { imagePalette: processedPalette })
                .then((updatedUserData) => updateUserData(updatedUserData));
        } catch (error) {
            console.error('Error updating version with image color palette:', error);
        } 
    }

    useEffect(() => {
        console.log("ColorResultsComponent loaded with:", imageUrl, {...versionData});

        if (!imageUrl) {
            updateImageColorPalette({});
            return;
        } else if (versionData?.imagePalette && Object.keys(versionData?.imagePalette).length > 0) {
            updateImageColorPalette(versionData.imagePalette);
        } else {
            Vibrant.from(imageUrl).quality(1).getPalette((err, palette) => { processVibrantData(palette); });
        }
    }, [imageUrl]);

    // Rendered Component
    if (Object.keys(imageColorPalette).length > 0) return (

        <>
            <h1>Results</h1>
            <ColorPaletteComponent versionProps={versionProps} imageColorPalette={imageColorPalette} imageUrl={imageUrl}/>
            <Divider pt={{root: {className: 'mt-auto'}}} />
            <ColorContrastComponent />
        </>

    ); else return (
        <div className="mx-4 my-auto">
            <h2 style={{color:'#aaaaaa'}}>Upload a screenshot on the left to explore your UI...</h2>
        </div>
    )
};

export default ColorResultsComponent;
