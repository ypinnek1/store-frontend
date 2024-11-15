import React, { useEffect, useState } from 'react';
import { FaFolder, FaFileAlt, FaDownload } from 'react-icons/fa';
import { useNavigate, useLocation } from 'react-router-dom';
import {truncateText} from '../utils'
import './FileGrid.css';

interface FileItem {
    name: string;
    type: 'folder' | 'file'; // Type is either 'folder' or 'file'
}

const FileGrid: React.FC = ({sidebarSelection}: any) => {
    const [files, setFiles] = useState<FileItem[]>([]);
    const location = useLocation();
    const navigate = useNavigate();
console.log(sidebarSelection)
    // Extract the current folder from the URL path
    const currentFolder = location.pathname.split('/').filter(Boolean).join('/');

    // Function to fetch files from the backend
    const fetchFiles = async (folder: string = '') => {
        try {
            const url = folder ? `https://aa8d-67-170-199-42.ngrok-free.app/files/${folder}?sortByDate=true` : 'https://aa8d-67-170-199-42.ngrok-free.app/files?sortByDate=true'; // Handle subfolder
            const response = await fetch(url, {
                headers: {
                    'ngrok-skip-browser-warning': 'true'
                }
            });
            if (!response.ok) {
                throw new Error('Failed to fetch files');
            }
            const fileItems: FileItem[] = await response.json();
            setFiles(fileItems);
        } catch (error: any) {
            console.error('Error fetching files:', error);
        }
    };

    // Fetch files when component mounts or when the current folder changes
    useEffect(() => {
        fetchFiles(currentFolder);
    }, [currentFolder]); // Dependency on `currentFolder`

    // Handle folder click and update the URL
    const handleFolderClick = (folderName: string) => {
        const newPath = currentFolder ? `${currentFolder}/${folderName}` : folderName;
        navigate(`/${newPath}`); // Update the URL to reflect the clicked folder
    };

    // Handle going back to the parent directory
    const handleGoBack = () => {
        const parentFolder = currentFolder.substring(0, currentFolder.lastIndexOf('/')); // Get the parent folder
        navigate(`/${parentFolder || ''}`); // If no parent, go to the root
    };

    // Handle file download
    const handleFileDownload = (fileName: string) => {
        // Trigger file download by redirecting to the download endpoint
        window.location.href = `https://aa8d-67-170-199-42.ngrok-free.app/download/${encodeURIComponent(fileName)}`;
    };  

    return (
        <div className="file-grid">
            {currentFolder && (
                <button onClick={handleGoBack} className="back-button">
                    Go Back
                </button>
            )}
            {files.map((file, index) => (
                <div className="file-item" key={index}>
                    {file.type === 'folder' ? (
                        <FaFolder
                            className="file-icon"
                            onClick={() => handleFolderClick(file.name)} // Open folder contents on click
                        />
                    ) : (
                        <>
                            <FaFileAlt className="file-icon" />
                            <FaDownload 
                                className="download-icon" 
                                onClick={() => handleFileDownload(file.name)} // Download file
                            />
                        </>
                    )}
                    <p>{truncateText(file.name, 15)}</p>
                </div>
            ))}
        </div>
    );
};

export default FileGrid;
