import React, { useState } from 'react';
import AWS from 'aws-sdk';

function AWSFileUpload({ folder }) {
    const [fileUpload, setFileUpload] = useState({})
    const [progress, setProgress] = useState(0);

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
                setProgress(Math.round((evt.loaded / evt.total) * 100))
            })
            .on('success', (cpt) => {
                // TODO Handle Success
            })
            .send((err) => {
                if(err) console.error("Upload Attempted: ", err);
            })
    }

    return (
        <div className="App" css={CSS}>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={(e) => setFileUpload(e.target.files)} name="fileUpload" id="fileUpload" multiple />
                <button type="submit">Upload</button>
            </form>
            Progress: {progress}
        </div>
    );
}

export default AWSFileUpload;