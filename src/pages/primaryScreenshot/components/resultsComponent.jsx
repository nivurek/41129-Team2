import React, { useEffect, useState } from 'react';
import { Tooltip } from "primereact/tooltip";
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import * as Color from '../../../utils/color.helpers';
import { HexColorPicker } from 'react-colorful';
import _, { set } from 'lodash';

const ResultsComponent = ({imageColorPalette}) => {

    // State Hooks
    const [colormindSuggestions, setColormindSuggestions] = useState([]);
    const [updatedImageColorPalette, setUpdatedImageColorPalette] = useState({});
    const [displayColorPicker, setDisplayColorPicker] = useState(null);

    // Palette Handlers
    const handlePaletteClick = (key) => {
        setDisplayColorPicker(key);
    }
    const handlePaletteClose = () => {
        setDisplayColorPicker(null);
    };
    
    // Image Color Palette Controllers
    const updateImageColorPalette = (key, e) => {
        setUpdatedImageColorPalette({...updatedImageColorPalette, [key]: e});
    }

    const resetImageColorPalette = () => {
        setUpdatedImageColorPalette({...imageColorPalette});
    }

    // Colormind Suggestion Controllers
    const generateNewSuggestion = () => {
        if (Object.keys(imageColorPalette).length > 0) {
            let colormindInput = [
                                    Color.hexToRgb(updatedImageColorPalette.vibrant ?? imageColorPalette.vibrant),
                                    Color.hexToRgb(updatedImageColorPalette.lightVibrant ?? imageColorPalette.lightVibrant),
                                    Color.hexToRgb(updatedImageColorPalette.darkVibrant ?? imageColorPalette.darkVibrant),
                                    Color.hexToRgb(updatedImageColorPalette.muted ?? imageColorPalette.muted),
                                    // Color.hexToRgb(updatedImageColorPalette.lightMuted ?? imageColorPalette.lightMuted),
                                    Color.hexToRgb(updatedImageColorPalette.darkMuted ?? imageColorPalette.darkMuted)
                                ];

            fetch('http://colormind.io/api/', {
                method: "POST",
                body: JSON.stringify({model: "default", input: colormindInput}),
            })
            .then((response) => response.json())
            .then((data) => {
                // Derive Array of Suggestion Hex Colors
                let suggestionsHex = data.result.map((suggestion) => Color.rgbToHex(suggestion[0], suggestion[1], suggestion[2]));

                // Append to colormind suggestion store
                setColormindSuggestions([...colormindSuggestions, suggestionsHex]);
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
    }

    // Use Effect Hooks
    useEffect(() => {
        setUpdatedImageColorPalette({...imageColorPalette});
    }, [imageColorPalette]);

    useEffect(() => {
        setColormindSuggestions([]);
        generateNewSuggestion();
    }, [imageColorPalette]);

    // Component Styles
    const styles = {
        popover: {
            position: 'absolute',
            zIndex: '2',
        },
        cover: {
            position: 'fixed',
            top: '0px',
            right: '0px',
            bottom: '0px',
            left: '0px',
        }
    }

    // Rendered Component
    if (Object.keys(imageColorPalette).length > 0) return (
        <div>
            <h1>Results</h1>
            <div className="your-palette">
                <div className="flex mb-3" style={{height: '2.5rem'}}>
                    <h2 className="mb-0 mr-3">Your Palette</h2>
                    {_.isEqual(updatedImageColorPalette, imageColorPalette) ? null :
                        <Button label="Reset Palette" icon="pi pi-refresh" size="small" outlined severity="danger" onClick={resetImageColorPalette} />
                    }
                </div>
                <div className="palette-container">
                    {Object.keys(updatedImageColorPalette).map((key, i) => {
                    return (
                        <div key={i}>
                            <Tooltip target={`.palette-color-user-${i}`} content={updatedImageColorPalette[key]} position="bottom" />
                            <div onClick={(e) => handlePaletteClick(key)} className={`palette-color-user-${i}`} style={{backgroundColor: updatedImageColorPalette[key]}}></div>
                            { displayColorPicker === key ? 
                                <div style={ styles.popover }>
                                    <div style={ styles.cover } onClick={handlePaletteClose} />
                                    <HexColorPicker color={updatedImageColorPalette[key]} onChange={(e) => updateImageColorPalette(key, e)} />
                                </div>
                            : null}
                        </div>
                    )})}
                </div>
            </div>
            <div className="suggested-palettes mt-3">
                <h2>Suggested Palettes</h2>
                <div className="flex flex-nowrap">
                    <Divider layout="vertical" />
                    <div>
                        {colormindSuggestions.map((suggestion, i) => {
                            return (
                                <div className="palette-container" key={i}>
                                    {suggestion.map((color, j) => {
                                        return (
                                            <div key={j}>
                                                <Tooltip target={`.palette-color-colormind-${i}-${j}`} content={color} position="bottom" />
                                                <div className={`palette-color-colormind-${i}-${j}`} style={{backgroundColor: color}}></div>
                                            </div>
                                        )
                                    })}
                                    {_.isEqual(updatedImageColorPalette, suggestion) ? <div class="palette-button" /> :
                                        <Button className="palette-button" icon="pi pi-upload" severity="info" tooltipOptions={{ position: 'bottom' }} tooltip="Set as your palette" text onClick={() => setUpdatedImageColorPalette(suggestion)} />
                                    }
                                    <Button className="palette-button" icon="pi pi-times" severity="danger" tooltipOptions={{ position: 'bottom' }} tooltip="Delete suggestion" text onClick={() => setColormindSuggestions(colormindSuggestions.filter((_, index) => index !== i))} />
                                </div>
                            )
                        })}
                        <Button label="Generate New Suggestion" className="mt-3" icon="pi pi-plus" size="small" severity="info" onClick={generateNewSuggestion} />
                    </div>
                </div>
            </div>
        </div>
    ); else return (
        <div className="mx-4 my-auto">
            <h2>Upload a screenshot on the left to start your ChromaUX journey...</h2>
        </div>
    )
};

export default ResultsComponent;