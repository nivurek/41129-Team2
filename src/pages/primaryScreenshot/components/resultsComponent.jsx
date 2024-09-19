import React, { useEffect, useState } from "react";
import { Tooltip } from "primereact/tooltip";
import * as Color from "../../../utils/color.helpers";

const Results = ({results}) => {
    const colormindInput = [Color.hexToRgb(results.vibrant),
                            Color.hexToRgb(results.lightVibrant),
                            Color.hexToRgb(results.darkVibrant),
                            Color.hexToRgb(results.muted),
                            Color.hexToRgb(results.lightMuted),
                            Color.hexToRgb(results.darkMuted)
                            ];

    const [colormindSuggestions, setColormindSuggestions] = useState([]);

    useEffect(() => {
        if (Object.keys(results).length > 0) {
            fetch('http://colormind.io/api/', {
                method: "POST",
                body: JSON.stringify({model: "default", input: colormindInput}),
            })
            .then((response) => response.json())
            .then((data) => {
                let suggestionsHex = data.result.map((suggestion) => Color.rgbToHex(suggestion[0], suggestion[1], suggestion[2]));

                setColormindSuggestions(suggestionsHex);

                // console.log('fetch-data', data);
            })
            .catch((err) => {
                console.log(err.message);
            });
        }
    }, [results]);

    if (Object.keys(results).length > 0) return (
        <div>
            <h1>Results</h1>
            <div className="your-palette">
                <h2>Your Palette</h2>
                <div className="palette-container">
                    {Object.keys(results).map((obj, i) => {
                    return (
                        <div key={i}>
                            <Tooltip target={`.palette-color-user-${i}`} content={results[obj]} position="bottom" />
                            <div className={`palette-color-user-${i}`} style={{backgroundColor: results[obj]}}></div>
                        </div>
                    )})}
                </div>
                <h2>Suggested Palettes</h2>
                <div className="palette-container">
                    {colormindSuggestions.map((suggestion, i) => {
                        return (
                            <div key={i}>
                                <Tooltip target={`.palette-color-colormind-${i}`} content={suggestion} position="bottom" />
                                <div className={`palette-color-colormind-${i}`} style={{backgroundColor: suggestion}}></div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    ); else return (
        <div className="mx-4 my-auto">
            <h2>Upload a screenshot on the left to start your ChromaUX journey...</h2>
        </div>
    )
};

export default Results;