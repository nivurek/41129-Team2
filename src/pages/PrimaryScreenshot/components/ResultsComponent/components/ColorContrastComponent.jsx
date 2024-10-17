import React, { useCallback, useState } from 'react';
import useEyeDropper from 'use-eye-dropper'
import _ from 'lodash';
import { Button } from 'primereact/button';

const ColorContrastComponent = ({}) => {
    const { open, close, isSupported } = useEyeDropper()
    const [foreground, setForeground] = useState('#fff')
    const [background, setBackground] = useState('#000')
    const [error, setError] = useState()

    const pickColor = useCallback((event) => {
        // Using async/await (can be used as a promise as-well)
        const openPicker = async (event) => {
        console.log(event)
          try {
            const color = await open()

            if (event == "foreground") setForeground(color.sRGBHex)
            else if (event == "background") setBackground(color.sRGBHex)

          } catch (e) {
            // Ensures component is still mounted
            // before calling setState
            if (!e.canceled) setError(e)
          }
        }
        openPicker(event)
    }, [open])

    // Rendered Component
    return (
        <>
            <h2 className="mb-0 mr-3">Color Contrast</h2>
            {isSupported() ?
                <div className="constast-container">
                    <Button className="contrast-color" style={{backgroundColor: foreground}} onClick={() => pickColor("foreground")}>Pick Foreground</Button>
                    <Button className="contrast-color" style={{backgroundColor: background}} onClick={() => pickColor("background")}>Pick Background</Button>
                </div>
                : <span>EyeDropper API not supported in this browser</span>
            }
            {!!error && <div>{error.message}</div>}
        </>
    )
};

export default ColorContrastComponent;
