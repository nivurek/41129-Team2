import React, { useEffect, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import * as Vibrant from 'node-vibrant'
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { Button } from 'primereact/button';

const Controls = ({handleRemove}) => {
    const { zoomIn, zoomOut, resetTransform } = useControls();
  
    return (
      <div className="image-tools">
        <Button className="zoom-button" icon="pi pi-search-plus" aria-label="Zoom In" onClick={() => zoomIn()}></Button>
        <Button className="zoom-button" icon="pi pi-search-minus" aria-label="Zoom Out" onClick={() => zoomOut()}></Button>
        <Button className="reset-button" icon="pi pi-undo" severity="danger" outlined aria-label="Reset Zoom" onClick={() => resetTransform()}></Button>
        <Button className="remove-button" icon="pi pi-times" severity="danger" aria-label="Remove Image" onClick={handleRemove}>Remove Image</Button>
      </div>
    );
  };

const ScreenshotUploadComponent = ({updateImageColorPalette}) => {
    const [imageUrl, setImageUrl] = useState('');
    const [data, setData] = useState({});
    const imageSrc = React.createRef();

    useEffect(() => {
        if (Object.keys(data).length === 0) return
        console.log(data);
        delete data.LightMuted;

        var processedData = {
            vibrant: data.Vibrant.hex,
            lightVibrant: data.LightVibrant.hex,
            darkVibrant: data.DarkVibrant.hex,
            muted: data.Muted.hex,
            darkMuted: data.DarkMuted.hex
        }

        console.log(processedData);

        updateImageColorPalette({...processedData});
    }, [data])

    useEffect(() => {
        if (!imageUrl) {updateImageColorPalette({}); return;}
        Vibrant.from(imageUrl).quality(1).getPalette((err, palette) => {setData(palette); console.log(data)})
    }, [imageUrl])

    const onUpload = (event) => {console.log(event);};

    const onRemove = () => {setImageUrl('');};
    
    const uploadHandler = (event) => {
        updateImageColorPalette({});
        setImageUrl(event.files[0].objectURL);
    };

    if (imageUrl) return (
        <TransformWrapper>
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
            <>
            <Controls handleRemove={onRemove} />
            <TransformComponent>
                <img className="image-preview" ref={imageSrc} src={imageUrl} alt="No Img" style={{maxWidth:'100%',maxHeight:'100%'}} />
            </TransformComponent>
            </>
        )}
        </TransformWrapper>
    )
    else return (
        <FileUpload className="w-30rem" accept="image/*" maxFileSize={1000000} customUpload="true" uploadHandler={uploadHandler} onUpload={onUpload} onRemove={onRemove} auto chooseLabel="Browse" />
    );
};

export default ScreenshotUploadComponent;
