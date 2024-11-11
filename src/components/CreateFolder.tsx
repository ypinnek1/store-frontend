import React, { useState } from 'react';
import './CreateFolder.css';

interface CreateFolderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreateFolderModal: React.FC<CreateFolderModalProps> = ({ isOpen, onClose }) => {
  const [folderName, setFolderName] = useState<string>('');
  const [message, setMessage] = useState<string>('');

  const handleFolderNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFolderName(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!folderName) {
      setMessage('Folder name is required');
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/createFolder/${folderName}`, {
        method: 'POST',
      });

      if (response.ok) {
        setMessage(`Folder "${folderName}" created successfully`);
        setFolderName(''); // Reset folder name after success
      } else {
        setMessage('Failed to create folder');
      }
    } catch (error) {
      console.error('Error creating folder:', error);
      setMessage('Error creating folder');
    }
  };

  return (
    <>
      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>Create a New Folder</h2>
            <form onSubmit={handleSubmit}>
              <div>
                <label htmlFor="folderName">Folder Name:</label>
                <input
                  type="text"
                  id="folderName"
                  name="folderName"
                  value={folderName}
                  onChange={handleFolderNameChange}
                  placeholder="Enter folder name"
                />
              </div>
              <button type="submit">Create Folder</button>
            </form>

            {message && <p>{message}</p>}

            <button onClick={onClose}>Close</button>
          </div>
        </div>
      )}
    </>
  );
};

const CreateFolder: React.FC<{ isFolderModalOpen: boolean; closeFolderModal: () => void }> = ({
  isFolderModalOpen,
  closeFolderModal,
}) => {
  return (
    <div>
      <CreateFolderModal isOpen={isFolderModalOpen} onClose={closeFolderModal} />
    </div>
  );
};

export default CreateFolder;
