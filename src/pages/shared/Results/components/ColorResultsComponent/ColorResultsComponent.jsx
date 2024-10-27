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
            <ColorPaletteComponent versionProps={versionProps} imageColorPalette={imageColorPalette} imageUrl={imageUrl}/>
            <Divider pt={{root: {className: 'mt-auto'}}} />
            <ColorContrastComponent />
        </>

    ); else return (
        <div className="mx-4 my-auto">
            {!versionData && 
                <div className="welcome-message">
                    <span style={{'--i': '1'}}>W</span>
                    <span style={{'--i': '2'}}>e</span>
                    <span style={{'--i': '3'}}>l</span>
                    <span style={{'--i': '4'}}>c</span>
                    <span style={{'--i': '5'}}>o</span>
                    <span style={{'--i': '6'}}>m</span>
                    <span style={{'--i': '7'}}>e</span>
                    <span style={{'--i': '8'}}>&nbsp;</span>
                    <span style={{'--i': '9'}}>t</span>
                    <span style={{'--i': '10'}}>o</span>
                    <span style={{'--i': '11'}}>&nbsp;</span>
                    <span style={{'--i': '12'}}>C</span>
                    <span style={{'--i': '13'}}>h</span>
                    <span style={{'--i': '14'}}>r</span>
                    <span style={{'--i': '15'}}>o</span>
                    <span style={{'--i': '16'}}>m</span>
                    <span style={{'--i': '17'}}>a</span>
                    <span style={{'--i': '18'}}>U</span>
                    <span style={{'--i': '19'}}>X</span>
                </div>}
            <h2 style={versionData && {color:'#aaaaaa'}}>Upload a screenshot on the left to explore your UI...</h2>
        </div>
    )
};

export default ColorResultsComponent;
