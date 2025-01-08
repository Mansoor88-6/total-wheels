import { useState, useRef } from "react";
import styled from "styled-components";
import { Button, LinearProgress, Typography, Paper } from "@mui/material";
import { uploadAllModels } from "../utils/cloudinaryUploader";

const UploaderContainer = styled(Paper)`
  padding: 20px;
  margin: 20px;
  background-color: var(--card-background) !important;
`;

const ProgressContainer = styled.div`
  margin: 20px 0;
`;

const FileInput = styled.input`
  display: none;
`;

const FileList = styled.div`
  margin: 15px 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const FileItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  background: rgba(255, 255, 255, 0.05);
  border-radius: 4px;
`;

function ModelUploader() {
  const [files, setFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setFiles(Array.from(event.target.files));
    }
  };

  const handleUpload = async () => {
    if (files.length === 0) return;

    setUploading(true);
    setProgress(0);

    try {
      await uploadAllModels(files);
      setProgress(100);
      alert("Upload complete! Check the downloaded model-urls.txt file.");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Upload failed. Check console for details.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <UploaderContainer>
      <Typography variant="h6" gutterBottom>
        Model Uploader
      </Typography>

      <Button
        variant="contained"
        onClick={() => fileInputRef.current?.click()}
        disabled={uploading}
      >
        Select Models
      </Button>

      <FileInput
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        multiple
        accept=".fbx,.obj,.gltf,.glb"
      />

      {files.length > 0 && (
        <FileList>
          {files.map((file, index) => (
            <FileItem key={index}>
              <Typography>{file.name}</Typography>
              <Typography>
                {(file.size / (1024 * 1024)).toFixed(2)} MB
              </Typography>
            </FileItem>
          ))}
        </FileList>
      )}

      {files.length > 0 && (
        <Button
          variant="contained"
          onClick={handleUpload}
          disabled={uploading}
          style={{ marginTop: "10px" }}
        >
          Upload to Cloudinary
        </Button>
      )}

      {uploading && (
        <ProgressContainer>
          <LinearProgress variant="determinate" value={progress} />
          <Typography variant="body2" style={{ marginTop: "5px" }}>
            Uploading... {progress.toFixed(0)}%
          </Typography>
        </ProgressContainer>
      )}
    </UploaderContainer>
  );
}

export default ModelUploader;
