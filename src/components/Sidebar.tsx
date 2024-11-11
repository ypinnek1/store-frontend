import React from 'react';
import { FaFolder, FaShareAlt, FaClock, FaTrashAlt } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar: React.FC = ({onClick}: any) => {
    return (
        <div className="sidebar">
            <ul>
                <li><FaFolder /> My Drive</li>
                <li><FaShareAlt /> Shared with Me</li>
                <li onClick={() => onClick("recent")}><FaClock /> Recent</li>
                <li><FaTrashAlt /> Trash</li>
            </ul>
        </div>
    );
};

export default Sidebar;
