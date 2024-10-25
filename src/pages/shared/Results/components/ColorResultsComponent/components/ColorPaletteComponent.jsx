import React, { useEffect, useState, useRef } from 'react';
import { Tooltip } from "primereact/tooltip";
import { Button } from 'primereact/button';
import { Divider } from 'primereact/divider';
import { HexColorPicker } from 'react-colorful';
import * as Color from 'utils/color.helpers';
import _ from 'lodash';

import { updateVersionHelper } from 'utils/api.helper';

const ColorPaletteComponent = ({ versionProps, imageColorPalette, imageUrl }) => {
    const { path, updateUserData, versionData } = versionProps;
  
    // State Hooks
    const [colormindSuggestions, setColormindSuggestions] = useState([]);
    const [updatedImageColorPalette, setUpdatedImageColorPalette] = useState({});
    const [displayColorPicker, setDisplayColorPicker] = useState(null);
  
    const [isMouseDown, setIsMouseDown] = useState(false);
    const [paletteHasChanged, setPaletteHasChanged] = useState(false);
  
    // Use a ref to track paletteHasChanged
    const paletteHasChangedRef = useRef(false);
  
    // console.log("TOP==== paletteHasChanged:", paletteHasChanged);
  
    // Handle mouse down
    const handleMouseDown = (event) => {
      if (event.button === 0) {
        setIsMouseDown(true);
      }
    };

    // Handle mouse up
    const handleMouseUp = (event) => {
      if (event.button === 0) {
        // console.log('triggered mouse up. Palette changed?', paletteHasChangedRef.current);
        setIsMouseDown(false);
        if (paletteHasChangedRef.current) {
          handleSavePaletteChanges();
        }
      }
    };

    useEffect(() => {
      // Add event listeners
      window.addEventListener('mousedown', handleMouseDown);
      window.addEventListener('mouseup', handleMouseUp);
  
      // Cleanup event listeners on unmount
      return () => {
        window.removeEventListener('mousedown', handleMouseDown);
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }, []);
  
    // Palette Handlers
    const handlePaletteClick = (key) => {
      setDisplayColorPicker(key);
    };
  
    const handlePaletteClose = () => {
      setDisplayColorPicker(null);
    };
  
    // Image Color Palette Controllers
    const handleUpdateImagePaletteByKey = (key, e) => {
      console.log('Updating image palette', e, paletteHasChanged);
      const updatedImagePaletteAfterKeyChange = {
        ...updatedImageColorPalette,
        [key]: e,
      };
      setUpdatedImageColorPalette(updatedImagePaletteAfterKeyChange);
  
      if (!paletteHasChanged) {
        console.log('TOGGLING HASCHANGED TO true');
        setPaletteHasChanged(true);
        paletteHasChangedRef.current = true; // Update ref value
      }
    };
  
    const handleSavePaletteChanges = () => {
      console.log('TRIGGERING DATABASE SAVE');
      if (versionData) {
        try {
          updateVersionHelper(path, { updatedImagePalette: { ...updatedImageColorPalette } })
            .then((updatedUserData) => {
              updateUserData(updatedUserData);
              setPaletteHasChanged(false);
              paletteHasChangedRef.current = false; // Reset ref value
            });
        } catch (error) {
          console.error('Error updating version with new updated image color palette:', error);
        }
      }
    };

    const handleResetImagePalette = () => {
        setUpdatedImageColorPalette({...imageColorPalette});

        if (versionData) try {
            updateVersionHelper(path, { updatedImagePalette: {...imageColorPalette} })
                .then((updatedUserData) => updateUserData(updatedUserData));
        } catch (error) {
            console.error('Error updating version with resetted image color palette:', error);
        }
    }

    const handleSetSuggestionAsPalette = (suggestion) => {
        const updatedImagePaletteAfterSuggestion = _.zipObject(Object.keys(updatedImageColorPalette), [...suggestion]);
        setUpdatedImageColorPalette(updatedImagePaletteAfterSuggestion);

        if (versionData) try {
            updateVersionHelper(path, { updatedImagePalette: updatedImagePaletteAfterSuggestion })
                .then((updatedUserData) => updateUserData(updatedUserData));
        } catch (error) {
            console.error('Error updating version with new suggested image color palette:', error);
        }
    }

    const handleDeleteSuggestion = (indexToDelete) => {
        const suggestionsAfterDelete = _.cloneDeep(colormindSuggestions).filter((_, index) => index !== indexToDelete);
        setColormindSuggestions(_.cloneDeep(suggestionsAfterDelete));

        if (versionData) try {
            updateVersionHelper(path, { suggestedPalettes: _.cloneDeep(suggestionsAfterDelete) ?? [] })
                .then((updatedUserData) => updateUserData(updatedUserData));
        } catch (error) {
            console.error('Error updating version with deleted colormind suggestion:', error);
        }
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
                const suggestionsAfterAppend = [..._.cloneDeep(colormindSuggestions), suggestionsHex];
                setColormindSuggestions(_.cloneDeep(suggestionsAfterAppend));

                if (versionData) try {
                    updateVersionHelper(path, { suggestedPalettes: _.cloneDeep(suggestionsAfterAppend) })
                        .then((updatedUserData) => updateUserData(updatedUserData));
                } catch (error) {
                    console.error('Error updating version with new colormind suggestion:', error);
                }
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
    }

    useEffect(() => {

        if (!imageUrl) {
            setUpdatedImageColorPalette({});
            setColormindSuggestions([]);
            return;
        } else if (versionData?.updatedImagePalette && Object.keys(versionData?.updatedImagePalette).length > 0) {
            setUpdatedImageColorPalette(versionData.updatedImagePalette);
        } else {
            setUpdatedImageColorPalette({...imageColorPalette});

            if (versionData) try {
                updateVersionHelper(path, { updatedImagePalette: {...imageColorPalette} })
                    .then((updatedUserData) => updateUserData(updatedUserData));
            } catch (error) {
                console.error('Error updating version with initial updated image color palette:', error);
            }
        }

        if (versionData) {
            setColormindSuggestions(versionData.suggestedPalettes);
        } else {
            setColormindSuggestions([]);
            generateNewSuggestion();
        }

    }, [imageUrl]);

    // Rendered Component
    return (
        <>
            <div className="your-palette">
                <div className="flex mb-3" style={{height: '2.5rem'}}>
                    <h2 className="mb-0 mr-3">Your Palette</h2>
                    {_.isEqual(updatedImageColorPalette, imageColorPalette) ? null :
                        <Button label="Reset Palette" icon="pi pi-refresh" size="small" outlined severity="danger" onClick={handleResetImagePalette} />
                    }
                </div>
                <div className="palette-container">
                    {Object.keys(updatedImageColorPalette).map((key, i) => {
                    return (
                        <div key={i}>
                            <Tooltip target={`.palette-${i}`} content={updatedImageColorPalette[key]} position="bottom" />
                            <div onClick={(e) => handlePaletteClick(key)} className={`palette-color-user palette-${i}`} style={{backgroundColor: updatedImageColorPalette[key]}}></div>
                            { displayColorPicker === key ? 
                                <div className="popover ml-2">
                                    <div className="cover" onClick={handlePaletteClose} />
                                    <HexColorPicker className="right-0" color={updatedImageColorPalette[key]} onChange={(e) => handleUpdateImagePaletteByKey(key, e)} />
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
                                                <Tooltip target={`.palette-${i}-${j}`} content={color} position="bottom" />
                                                <div className={`palette-color-colormind palette-${i}-${j}`} style={{backgroundColor: color}}></div>
                                            </div>
                                        )
                                    })}
                                    {_.isEqual(updatedImageColorPalette, suggestion) ? <div className="palette-button" /> :
                                        <Button className="palette-button" icon="pi pi-upload" severity="info" tooltipOptions={{ position: 'bottom' }} tooltip="Set as your palette" text onClick={() => handleSetSuggestionAsPalette(suggestion)} />
                                    }
                                    <Button className="palette-button" icon="pi pi-times" severity="danger" tooltipOptions={{ position: 'bottom' }} tooltip="Delete suggestion" text onClick={() => handleDeleteSuggestion(i)} />
                                </div>
                            )
                        })}
                        <Button label="Generate New Suggestion" className="mt-3" icon="pi pi-plus" size="small" severity="info" onClick={generateNewSuggestion} />
                    </div>
                </div>
            </div>
        </>
    )
};

export default ColorPaletteComponent;
