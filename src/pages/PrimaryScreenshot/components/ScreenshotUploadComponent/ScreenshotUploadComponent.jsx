import React, { useEffect, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import * as Vibrant from 'node-vibrant';
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { Button } from 'primereact/button';
import * as filestack from 'filestack-js'; 
import ReactMarkdown from 'react-markdown';

const client = filestack.init(process.env.REACT_APP_FILESTACK_API_KEY); 
const enableGemini = process.env.REACT_APP_ENABLE_GEMINI || false;
const enableFilestack = process.env.REACT_APP_ENABLE_FILESTACK || false;


const Controls = ({ handleRemove }) => {
  const { zoomIn, zoomOut, resetTransform } = useControls();

  return (
    <div className="image-tools">
      <Button className="zoom-button" icon="pi pi-search-plus" onClick={() => zoomIn()} />
      <Button className="zoom-button" icon="pi pi-search-minus" onClick={() => zoomOut()} />
      <Button className="reset-button" icon="pi pi-undo" severity="danger" outlined onClick={() => resetTransform()} />
      <Button className="remove-button" icon="pi pi-times" severity="danger" onClick={handleRemove}>Remove Image</Button>
    </div>
  );
};

const ScreenshotUploadComponent = ({ updateImageColorPalette }) => {
  const [imageUrl, setImageUrl] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [data, setData] = useState({});
  const imageSrc = React.createRef();

  useEffect(() => {
    if (Object.keys(data).length === 0) return;
    delete data.LightMuted;

    const processedData = {
      vibrant: data.Vibrant?.hex,
      lightVibrant: data.LightVibrant?.hex,
      darkVibrant: data.DarkVibrant?.hex,
      muted: data.Muted?.hex,
      darkMuted: data.DarkMuted?.hex
    };

    updateImageColorPalette({ ...processedData });
  }, [data]);

  useEffect(() => {
    if (!imageUrl) { updateImageColorPalette({}); return; }
    Vibrant.from(imageUrl).quality(1).getPalette((err, palette) => { setData(palette); });
    // Set user.project[id].page[id].result[id].screenshot to imageUrl
  }, [imageUrl]);

  const uploadHandler = async (event) => {
    console.log(enableGemini)
    const file = event.files[0];
    if (!file) return;

    if(enableFilestack) {
      try {
        const uploadResponse = await client.upload(file);
        const publicUrl = uploadResponse.url;

        setImageUrl(publicUrl);
        if(enableGemini) {
          await analyzeWithGemini(publicUrl);
        }
      } catch (error) {
        console.error('Error uploading image to Filestack:', error);
      }
    }
  };

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
  
    } catch (error) {
      console.error('Error analyzing UI/UX with Gemini API:', error);
    }
  };

  const onRemove = () => {
    setImageUrl('');
    setAnalysis('');
  };

  return (
    <div>
      {imageUrl ? (

        <TransformWrapper>
          {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
            <Controls handleRemove={onRemove} />
            <TransformComponent>
              <img className="image-preview" ref={imageSrc} src={imageUrl} alt="No Img" style={{ maxWidth: '100%', maxHeight: '100%' }} />
            </TransformComponent>
            </>
          )}
        </TransformWrapper>
      ) : (
        <FileUpload
          className="w-30rem"
          accept="image/*"
          maxFileSize={1000000}
          customUpload
          uploadHandler={uploadHandler}
          onRemove={onRemove}
          auto
          chooseLabel="Browse"
        />
      )}

        {analysis && (
        <div
        className="analysis-result"
        style={{
          maxHeight: '150px',
          overflowY: 'auto',
          padding: '10px',
        }}
        >
          <h3>AI Analysis Result:</h3>
            <ReactMarkdown>{analysis}</ReactMarkdown>
          </div>
        )}
    </div>
  );
};

export default ScreenshotUploadComponent;
