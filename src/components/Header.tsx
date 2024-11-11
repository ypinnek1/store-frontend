import React, {useState} from 'react';
import { FaSearch, FaFile, FaFolder } from 'react-icons/fa';
import FileUpload from './FileUpload'
import CreateFolder from './CreateFolder'
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

    const [isFolderModalOpen, setIsFolderModalOpen] = useState<boolean>(false);

    const openFolderModal = () => setIsFolderModalOpen(true);

    const closeFolderModal = () => setIsFolderModalOpen(false);

    return (
        <div className="header">
            <div className="header-left">
                <span className="google-drive-logo">GDrive</span>
                <div className="search-container">
                    <FaSearch />
                    <input type="text" placeholder="Search in Drive" />
                </div>
            </div>
            <div className="header-right pr-10">
                <button onClick={handleNewClick} className="new-button"><FaFile /> New File</button>
                <FileUpload closeModal={closeModal} isModalOpen={isModalOpen} />
            </div>
            <div className="header-right">
                <button onClick={openFolderModal} className="new-button"><FaFolder /> New Folder</button>
                <CreateFolder isFolderModalOpen={isFolderModalOpen} closeFolderModal={closeFolderModal} />
            </div>
        </div>
    );
};

export default Header;
