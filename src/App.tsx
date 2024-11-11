import React from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FileGrid from './components/FileGrid';
import './App.css';

const App: React.FC = () => {
    return (
        <div className="app">
            <Header />
            <div className="app-content">
                <Sidebar />
                <div className="main-content">
                    <FileGrid />
                </div>
            </div>
        </div>
    );
};

export default App;
