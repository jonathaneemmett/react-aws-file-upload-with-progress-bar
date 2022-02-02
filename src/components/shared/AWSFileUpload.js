import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';

import AWS from 'aws-sdk';
import ProgressBar from "./ProgressBar";

function AWSFileUpload({ folder }) {
    const fileInputRef = useRef(null);

    const [fileUpload, setFileUpload] = useState({});
    const [progress, setProgress] = useState(0);
    const [result, setResult] = useState(null);

    const S3_BUCKET = process.env.REACT_APP_S3_BUCKET + "/" + folder;
    const REGION = process.env.REACT_APP_S3_REGION;

    AWS.config.update({
        accessKeyId: process.env.REACT_APP_AWS_KEY,
        secretAccessKey: process.env.REACT_APP_SECRET_AWS_KEY,
    });

    const bucket = new AWS.S3({
        params: { Bucket: S3_BUCKET },
        region: REGION
    });

    const handleSubmit = (e) => {
        e.preventDefault();

        const params = {
            ACL: 'public-read',
            Body: fileUpload[0],
            Bucket: S3_BUCKET,
            Key: fileUpload[0].name
        };

        bucket.putObject(params)
            .on('httpUploadProgress', (evt) => {
                if(result !== null){
                    setResult(null);
                }
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .on('success', (cpt) => {

                setFileUpload({});
                setProgress(0);
                setResult(true);
                fileInputRef.current.value = null;
            })
            .send((err) => {
                if(err) console.error("Upload Attempted: ", err);
                setResult(false);
            })
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <input type="file" ref={fileInputRef} onChange={(e) => setFileUpload(e.target.files)} multiple />
                <button type="submit">Upload</button>
            </form>
            <ProgressBar completed={progress} result={result} />
        </div>
    );
}

AWSFileUpload.propTypes = {
    folder: PropTypes.string
}

AWSFileUpload.defaultProps = {
    folder: ''
}

export default AWSFileUpload;