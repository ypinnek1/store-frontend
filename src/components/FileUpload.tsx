import React, { useState } from 'react';
import './FileUpload.css';

interface FileUploadProps {
  closeModal: () => void;
  isModalOpen: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({ closeModal, isModalOpen }) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleUpload = async (): Promise<void> => {
    if (file) {
      const formData = new FormData();
      formData.append('file', file);
      const path = window.location.pathname;
      const pathParts = path.split('/').filter(Boolean);
      formData.append("folder", pathParts[0]);

      try {
        const response = await fetch('https://aa8d-67-170-199-42.ngrok-free.app/upload', {
          method: 'POST',
          body: formData,
          headers: {
            'ngrok-skip-browser-warning': 'true'
          }
        });

        if (response.ok) {
          console.log('File uploaded successfully');
        } else {
          console.error('Error uploading file:', response.statusText);
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <div>
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2 className="modal-header">Upload a File</h2>

            <input
              type="file"
              id="file-upload"
              onChange={handleFileChange}
              className="file-input"
            />
            <label htmlFor="file-upload" className="file-input-label">
              Choose File
            </label>

            {file && (
              <div className="file-input-details">
                <p><strong>File Selected:</strong> {file.name}</p>
                <p><strong>Size:</strong> {file.size} bytes</p>
              </div>
            )}

            <div className="button-container">
              <button
                onClick={handleUpload}
                disabled={!file}
                className="upload-button"
              >
                Upload
              </button>
              <button onClick={closeModal} className="cancel-button">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
