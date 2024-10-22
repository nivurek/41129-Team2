import React from "react";
import { FileUpload } from "primereact/fileupload";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { Button } from 'primereact/button';
import * as filestack from 'filestack-js'; 

const client = filestack.init(process.env.REACT_APP_FILESTACK_API_KEY); 
const enableFilestack = process.env.REACT_APP_ENABLE_FILESTACK || false;


const Controls = ({ handleRemove }) => {
    const { zoomIn, zoomOut, resetTransform } = useControls();

    return (
        <div className="image-tools">
            <Button className="zoom-button" icon="pi pi-search-plus" onClick={() => zoomIn()} />
            <Button className="zoom-button" icon="pi pi-search-minus" onClick={() => zoomOut()} />
            <Button className="reset-button" icon="pi pi-undo" severity="danger" outlined onClick={() => resetTransform()} />
            <Button className="remove-button" icon="pi pi-times" severity="danger" onClick={handleRemove}>&nbsp;Remove Image</Button>
        </div>
    );
};

const ScreenshotUploadComponent = ({ imageUrl, setImageUrl }) => {

    const imageSrc = React.createRef();

    const uploadHandler = async (event) => {
        const file = event.files[0];
        if (!file) return;

        if(enableFilestack) {
            try {
                const uploadResponse = await client.upload(file);
                const publicUrl = uploadResponse.url;

                setImageUrl(publicUrl);
            } catch (error) {
                console.error('Error uploading image to Filestack:', error);
            }
        }
    };

    const onRemove = () => {
        setImageUrl('');
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
        </div>
    );
};

export default ScreenshotUploadComponent;
