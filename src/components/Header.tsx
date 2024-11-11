import React, {useState} from 'react';
import { FaSearch, FaPlus } from 'react-icons/fa';
import FileUpload from './FileUpload'
import './Header.css';

const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);  // State to control modal visibility

    // Close the modal
    const closeModal = (): void => {
      setIsModalOpen(false);
    };

    // Trigger the file input click when the 'New' button is clicked
    const handleNewClick = (): void => {
        setIsModalOpen(true);  // Open the modal
    };

    return (
        <div className="header">
            <div className="header-left">
                <span className="google-drive-logo">GDrive</span>
                <div className="search-container">
                    <FaSearch />
                    <input type="text" placeholder="Search in Drive" />
                </div>
            </div>
            <div className="header-right">
                <button onClick={handleNewClick} className="new-button"><FaPlus /> New</button>
                <FileUpload closeModal={closeModal} isModalOpen={isModalOpen} />
            </div>
        </div>
    );
};

export default Header;
