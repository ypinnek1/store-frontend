import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import FileGrid from './components/FileGrid';
import './App.css';

const App: React.FC = () => {
  const [sidebarSelection, setSidebarSelection] = useState("default")

  const returnSelection = (value: string) => {
    console.log("value = ", value)
    setSidebarSelection(value)
  }
    return (
        <div className="app">
            <Header />
            <div className="app-content">
              {/* @ts-ignore */}
                <Sidebar onClick={returnSelection}/>
                <div className="main-content">
                                {/* @ts-ignore */}
                    <FileGrid sidebarSelection={sidebarSelection} />
                </div>
            </div>
        </div>
    );
};

export default App;
