import React from 'react';
import { FaFolder, FaFileAlt } from 'react-icons/fa';
import './FileGrid.css';

const FileGrid: React.FC = () => {
    return (
        <div className="file-grid">
            <div className="file-item">
                <FaFolder className="file-icon" />
                <p>Folder 1</p>
            </div>
            <div className="file-item">
                <FaFileAlt className="file-icon" />
                <p>Document 1</p>
            </div>
            <div className="file-item">
                <FaFolder className="file-icon" />
                <p>Folder 2</p>
            </div>
            <div className="file-item">
                <FaFileAlt className="file-icon" />
                <p>Document 2</p>
            </div>
        </div>
    );
};

export default FileGrid;
