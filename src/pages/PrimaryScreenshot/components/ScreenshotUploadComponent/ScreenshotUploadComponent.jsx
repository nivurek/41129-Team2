import React, { useEffect, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import * as Vibrant from 'node-vibrant'

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

    return (
        <div>
            <FileUpload className="w-30rem" accept="image/*" maxFileSize={1000000} customUpload="true" uploadHandler={uploadHandler} onUpload={onUpload} onRemove={onRemove} auto chooseLabel="Browse" />
            <img ref={imageSrc} src={imageUrl} alt="No Img" style={{width:'100px', height: '100px'}} />
        </div>
    );
};

export default ScreenshotUploadComponent;
