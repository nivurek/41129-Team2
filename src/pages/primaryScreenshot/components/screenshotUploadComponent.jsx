import React, { useState, useEffect } from "react";
import { FileUpload } from "primereact/fileupload";
import { usePalette } from 'react-palette'

const ScreenshotUpload = () => {
    const [imageUrl, setImageUrl] = useState('');

    const { data, loading, error } = usePalette(imageUrl);
    // const { data, loading, error } = useState({});

    // Vibrant.from('path/to/image').getPalette()
    // .then((palette) => console.log(palette))


    // useEffect(() => {
    //     fetch('https://jsonplaceholder.typicode.com/posts?_limit=10')
    //         .then((response) => response.json())
    //         .then((data) => {
    //             console.log(data);
    //             setColours(data);
    //         })
    //         .catch((err) => {
    //             console.log(err.message);
    //         });
    // }, []);

    const onUpload = (event) => {console.log(event);};
    
    const uploadHandler = (event) => {
        console.log(event);
        setImageUrl(event.files[0].objectURL);
    };

    return (
        <div>
            <h1>SC Upload</h1>
            {Object.keys(data).map((obj, i) => {
            return (
                <div key={i}>
                    color {obj}: {data[obj]}
                </div>
            )})}
            <FileUpload mode="basic" accept="image/*" maxFileSize={1000000} customUpload="true" uploadHandler={uploadHandler} onUpload={onUpload} auto chooseLabel="Browse" />
        </div>
    );
};

export default ScreenshotUpload;