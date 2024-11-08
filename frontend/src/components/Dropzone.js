import React, { useCallback, useState } from "react";
import Predict from "./Predict";
import { useDropzone } from "react-dropzone";
import styles from "./Dropzone.module.css";

export default function MyDropzone() {
  const [acceptedFiles, setAcceptedFiles] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const onDrop = useCallback((files) => {
    setAcceptedFiles(files);
    if (files && files.length > 0) {
      const file = files[0];
      const previewUrl = URL.createObjectURL(file);
      setImagePreview(previewUrl);
    }
  }, []);
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });

  return (
    <div className={styles.container}>
      <div className={styles.box}>
        <div
          {...getRootProps()}
          className={styles.drag_and_drop}
          style={{
            backgroundImage: imagePreview ? `url(${imagePreview})` : "none", // Apply image as background
          }}
        >
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <>
              <br />
              <br />

              <p>Drag 'n' drop some files here, or click to select files</p>
            </>
          )}
        </div>
      

        {acceptedFiles && acceptedFiles.length > 0 && (
          <div className={styles.result_section}>
            <Predict acceptedFiles={acceptedFiles} />
          </div>
        )}
      </div>
    </div>
  );
}
