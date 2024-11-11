import React from 'react';
import { FaFolder, FaFileAlt, FaShareAlt, FaTrashAlt, FaClock } from 'react-icons/fa';
import './GoogleDrivePage.css';

const GoogleDrivePage: React.FC = () => {
    return (
        <div className="drive-container">
            {/* Navigation Bar */}
            <nav className="drive-nav">
                <div className="drive-nav-content">
                    <h1>Google Drive</h1>
                    <button className="upload-button">+ New</button>
                </div>
            </nav>

            <div className="drive-content">
                {/* Sidebar */}
                <aside className="drive-sidebar">
                    <ul>
                        <li>
                            <FaFolder className="sidebar-icon" />
                            <span>My Drive</span>
                        </li>
                        <li>
                            <FaShareAlt className="sidebar-icon" />
                            <span>Shared with Me</span>
                        </li>
                        <li>
                            <FaClock className="sidebar-icon" />
                            <span>Recent</span>
                        </li>
                        <li>
                            <FaTrashAlt className="sidebar-icon" />
                            <span>Trash</span>
                        </li>
                    </ul>
                </aside>

                {/* Main Content */}
                <main className="drive-main">
                    <div className="file-grid">
                        {/* File Items */}
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
                        {/* Add more file items as needed */}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default GoogleDrivePage;
