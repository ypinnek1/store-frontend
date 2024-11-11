import React, { useState, useEffect } from 'react';
import { FaSearch, FaFile, FaFolder, FaDownload } from 'react-icons/fa';
import FileUpload from './FileUpload';
import CreateFolder from './CreateFolder';
import './Header.css';

const Header: React.FC = () => {
    const [isModalOpen, setIsModalOpen] = useState(false); // State to control file modal visibility
    const [isFolderModalOpen, setIsFolderModalOpen] = useState(false); // State to control folder modal visibility
    const [searchQuery, setSearchQuery] = useState(''); // State for search query
    const [searchResults, setSearchResults] = useState<any[]>([]); // State for search results

    // Close the modal
    const closeModal = (): void => {
        setIsModalOpen(false);
    };

    const handleNewClick = (): void => {
        setIsModalOpen(true); // Open the modal for file upload
    };

    const openFolderModal = () => setIsFolderModalOpen(true);
    const closeFolderModal = () => setIsFolderModalOpen(false);

    // Handle search input change
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    // Fetch search results when the search query changes
    useEffect(() => {
        if (searchQuery.trim() === '') {
            setSearchResults([]); // Clear results if the query is empty
            return;
        }

        const fetchSearchResults = async () => {
            try {
                const response = await fetch(`http://localhost:8080/search?q=${encodeURIComponent(searchQuery)}`);
                if (response.ok) {
                    const data = await response.json();
                    setSearchResults(data);
                } else {
                    console.error('Failed to fetch search results');
                }
            } catch (error) {
                console.error('Error fetching search results:', error);
            }
        };

        fetchSearchResults();
    }, [searchQuery]);

    // Handle file download
    const handleFileDownload = (fileName: string) => {
        // Trigger file download by redirecting to the download endpoint
        window.location.href = `http://localhost:8080/download/${encodeURIComponent(fileName)}`;
    };

    return (
        <div className="header">
            <div className="header-left">
                <span className="google-drive-logo">GDrive</span>
                <div className="search-container">
                    <FaSearch />
                    <input
                        type="text"
                        placeholder="Search in Drive"
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                    {/* Display search results */}
                    {searchResults.length > 0 && (
                        <div className="search-results">
                            <ul>
                                {searchResults.map((result, index) => (
                                    <li key={index}>
                                        <span>{result.type === 'file' ? <FaFile /> : <FaFolder />}</span> {result.name}
                                        {result.type === 'file' && (
                                            <FaDownload 
                                                className="download-icon" 
                                                onClick={() => handleFileDownload(result.name)} // Download file
                                            />
                                        )}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
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
