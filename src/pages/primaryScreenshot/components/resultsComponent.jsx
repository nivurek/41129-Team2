import React from "react";
import { Tooltip } from "primereact/tooltip";

const Results = ({results}) => {
  if (results) return (
    <div>
        <h1>Results</h1>
        <div className="your-palette">
            <h2>Your Palette</h2>
            <div className="palette-container">
                {Object.keys(results).map((obj, i) => {
                return (
                    <div key={i}>
                        <Tooltip target={`.palette-color-${i}`} content={results[obj]} position="bottom" />
                        <div className={`palette-color-${i}`} style={{backgroundColor: results[obj]}}></div>
                    </div>
                )})}
            </div>
            {/* <h2>Suggested Palettes</h2> */}
        </div>
    </div>
  ); else return (
    <div>
        <h2>Upload a screenshot on the left to get your palette</h2>
    </div>
  )
};

export default Results;