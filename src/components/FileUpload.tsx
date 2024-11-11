/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';

// Define the types for the props
interface FileUploadProps {
    closeModal: () => void;
    isModalOpen: boolean;
}

const FileUpload: React.FC<FileUploadProps> = ({closeModal, isModalOpen}) => {
  const [file, setFile] = useState<File | null>(null); // State to hold the selected file

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    const selectedFile = event.target.files ? event.target.files[0] : null;
    if (selectedFile) {
      setFile(selectedFile); // Save the selected file to state
    }
  };

  // Handle file upload (just log the file for this example)
  const handleUpload = async (): Promise<void> => {
    if (file) {
      console.log('Uploading file:', file.name);
  
      // Create a FormData object to send the file
      const formData = new FormData();
      formData.append('file', file);  // 'file' is the name of the field expected by the backend
      const path = window.location.pathname;

        // Extract the part after the port number (ignoring the leading '/')
        const pathParts = path.split('/').filter(Boolean);

      formData.append("folder", pathParts[0]);

      try {
        // Send the FormData to the backend using fetch
        const response = await fetch('http://localhost:8080/upload', {
          method: 'POST',
          body: formData,
        });
  
        // Check if the upload was successful
        if (response.ok) {
          console.log('File uploaded successfully');
          // Handle successful upload (e.g., show a message, reset form, etc.)
        } else {
          console.error('Error uploading file:', response.statusText);
          // Handle failure (e.g., show error message)
        }
      } catch (error) {
        console.error('Error uploading file:', error);
        // Handle network or other errors
      }
    }
  };
  

  return (
    <div>
      {/* Modal - Only visible when isModalOpen is true */}
      {isModalOpen && (
        <div style={modalOverlayStyle}>
          <div style={modalContentStyle}>
            <h2 style={modalHeaderStyle}>Upload a File</h2>

            {/* File input for file selection */}
            <input
              type="file"
              onChange={handleFileChange}
              style={fileInputStyle}
            />

            {/* Display selected file details */}
            {file && (
              <div style={fileDetailsStyle}>
                <p><strong>File Selected:</strong> {file.name}</p>
                <p><strong>Size:</strong> {file.size} bytes</p>
              </div>
            )}

            <div style={buttonContainerStyle}>
              <button
                onClick={handleUpload}
                disabled={!file}
                style={uploadButtonStyle}
              >
                Upload
              </button>
              <button onClick={closeModal} style={cancelButtonStyle}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Refined styles
const modalOverlayStyle: React.CSSProperties = {
  position: 'fixed',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'rgba(0, 0, 0, 0.6)',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  zIndex: 1000,
};

const modalContentStyle: React.CSSProperties = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  width: '400px',
  textAlign: 'center',
  boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
};

const modalHeaderStyle: React.CSSProperties = {
  fontSize: '24px',
  marginBottom: '20px',
  color: '#333',
};

const fileInputStyle: React.CSSProperties = {
  margin: '20px 0',
  padding: '10px',
  borderRadius: '4px',
  border: '1px solid #ccc',
  backgroundColor: '#fafafa',
};

const fileDetailsStyle: React.CSSProperties = {
  margin: '10px 0',
  textAlign: 'left',
  fontSize: '14px',
  color: '#555',
};

const buttonContainerStyle: React.CSSProperties = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '20px',
};

const uploadButtonStyle: React.CSSProperties = {
  backgroundColor: '#4CAF50',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  width: '48%',
  transition: 'background-color 0.3s',
};

const cancelButtonStyle: React.CSSProperties = {
  backgroundColor: '#f44336',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '16px',
  width: '48%',
  transition: 'background-color 0.3s',
};

// Hover effect for buttons
// @ts-ignore
uploadButtonStyle[':hover'] = { backgroundColor: '#45a049' };
// @ts-ignore
cancelButtonStyle[':hover'] = { backgroundColor: '#e53935' };

export default FileUpload;
