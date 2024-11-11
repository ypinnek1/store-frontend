import React, { useEffect, useState } from 'react';
import { FaFolder, FaFileAlt } from 'react-icons/fa';
import './FileGrid.css';

interface FileItem {
    name: string;
    type: 'folder' | 'file'; // Type is either 'folder' or 'file'
}

const FileGrid: React.FC = () => {
    const [files, setFiles] = useState<FileItem[]>([]);
    // Fetch the list of files from the backend when the component mounts
    useEffect(() => {
        const fetchFiles = async () => {
            try {
                const response = await fetch('http://localhost:8080/files');
                const fileNames = await response.text();

                // Split the file names by newline
                const fileItems = fileNames.split('\n').map(name => {
                    // Add your logic here to differentiate between folders and files
                    // For now, let's assume everything is a file unless we can determine it's a folder
                    const type: 'folder' | 'file' = name.toLowerCase().includes('folder') ? 'folder' : 'file';
                    return { name, type };
                });
                console.log("fileItems = ", fileItems)

                setFiles(fileItems);
            } catch (error) {
                console.error('Error fetching files:', error);
            }
        };

        fetchFiles();
    }, []);

    return (
        <div className="file-grid">
            {files.map((file, index) => (
                <div className="file-item" key={index}>
                    {file.type === 'folder' ? (
                        <FaFolder className="file-icon" />
                    ) : (
                        <FaFileAlt className="file-icon" />
                    )}
                    <p>{file.name}</p>
                </div>
            ))}
        </div>
    );
};

export default FileGrid;
