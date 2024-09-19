import React, { useEffect, useState } from "react";
import { FileUpload } from "primereact/fileupload";
import { usePalette } from 'react-palette'

const ScreenshotUpload = ({updateResults}) => {
    const [imageUrl, setImageUrl] = useState('');

    const { data, loading, error } = usePalette(imageUrl);

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

    useEffect(() => {
        console.log('data', data);
        updateResults(data);
    }, [data])

    const onUpload = (event) => {console.log(event);};

    const onRemove = (event) => {setImageUrl('');};
    
    const uploadHandler = (event) => {
        setImageUrl(event.files[0].objectURL);
    };

    return (
        <FileUpload className="w-30rem" accept="image/*" maxFileSize={1000000} customUpload="true" uploadHandler={uploadHandler} onUpload={onUpload} onRemove={onRemove} auto chooseLabel="Browse" />
    );
};

export default ScreenshotUpload;