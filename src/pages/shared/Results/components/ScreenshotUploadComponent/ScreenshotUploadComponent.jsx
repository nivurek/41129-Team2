import React, { useEffect } from "react";
import { FileUpload } from "primereact/fileupload";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import { Button } from 'primereact/button';
import * as filestack from 'filestack-js'; 

import { updateVersionHelper } from "utils/api.helper";

const client = filestack.init(process.env.REACT_APP_FILESTACK_API_KEY); 
const enableFilestack = process.env.REACT_APP_ENABLE_FILESTACK || false;

const Controls = ({ removeAllowed, handleRemove }) => {
    const { zoomIn, zoomOut, resetTransform } = useControls();

    return (
        <div className="image-tools">
            <Button className="zoom-button" icon="pi pi-search-plus" onClick={() => zoomIn()} />
            <Button className="zoom-button" icon="pi pi-search-minus" onClick={() => zoomOut()} />
            <Button className="reset-button" icon="pi pi-undo" severity="danger" outlined onClick={() => resetTransform()} />
            {removeAllowed && <Button className="remove-button" icon="pi pi-times" severity="danger" onClick={handleRemove}>&nbsp;Remove Image</Button>}
        </div>
    );
};

const ScreenshotUploadComponent = ({ versionProps, imageUrl, setImageUrl }) => {

    const {path, versionData, updateUserData} = versionProps;

    const imageSrc = React.createRef();
    const transformSrc = React.createRef();

    const uploadHandler = async (event) => {
        const file = event.files[0];
        if (!file) return;

        if(enableFilestack) {
            try {
                const uploadResponse = await client.upload(file);
                const publicUrl = uploadResponse.url;

                if (!imageUrl) setImageUrl(publicUrl);

                // If there is a path to a version, update the version with the new image
                if (versionData) {
                    updateVersionHelper(path, { screenshotUrl: publicUrl })
                        .then((updatedUserData) => updateUserData(updatedUserData));
                }
            } catch (error) {
                console.error('Error uploading image to Filestack:', error);
            }
        }
    };

    const onRemove = () => {
        setImageUrl('');
    };

    return (
        <>
        {imageUrl ? (

            <TransformWrapper ref={transformSrc} centerZoomedOut={true}>
            {({ centerView, zoomIn, zoomOut, resetTransform, ...rest }) => (
                <>
                <Controls removeAllowed={!path.versionId} handleRemove={onRemove} />
                <TransformComponent>
                <img className="image-preview" ref={imageSrc} src={imageUrl} onLoad={() => {centerView(undefined, 0)}} alt="No Img" style={{ maxWidth: '100%', maxHeight: '100%' }} />
                </TransformComponent>
                </>
            )}
            </TransformWrapper>
        ) : (
            <FileUpload
                className="w-30rem m-auto"
                accept="image/*"
                maxFileSize={1000000}
                customUpload
                uploadHandler={uploadHandler}
                onRemove={onRemove}
                auto
                chooseLabel="Browse"
            />
        )}
        </>
    );
};

export default ScreenshotUploadComponent;
