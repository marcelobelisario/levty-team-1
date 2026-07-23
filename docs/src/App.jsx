import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import FlowViewer from './components/FlowViewer';
import { diagrams } from './diagrams/diagramData';
import { Moon, Sun, Download, Maximize } from 'lucide-react';

export default function App() {
  const [activeId, setActiveId] = useState('overview');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDark, setIsDark] = useState(true);

  const activeDiagram = diagrams.find(d => d.id === activeId) || diagrams[0];

  const toggleTheme = () => {
    setIsDark(!isDark);
    document.documentElement.classList.toggle('dark-theme', !isDark);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else if (document.exitFullscreen) {
      document.exitFullscreen();
    }
  };

  return (
    <div className={`app-container ${isDark ? 'dark-theme' : ''}`}>
      <Sidebar 
        activeId={activeId} 
        onSelect={setActiveId}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
      
      <main className="main-content">
        <header className="topbar">
          <div className="breadcrumb">
            <span className="text-tertiary">Architecture</span>
            <span className="separator">/</span>
            {activeDiagram.title}
          </div>
          
          <div className="topbar-actions">
            <button className="icon-btn tooltip" aria-label="Toggle Theme" onClick={toggleTheme}>
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>
            
            <button className="icon-btn tooltip" aria-label="Export PNG">
              <Download size={20} />
            </button>
            
            <button className="icon-btn tooltip" aria-label="Fullscreen" onClick={toggleFullscreen}>
              <Maximize size={20} />
            </button>
          </div>
        </header>

        <div className="viewer-container">
          <FlowViewer diagram={activeDiagram} />
        </div>
      </main>
    </div>
  );
}
