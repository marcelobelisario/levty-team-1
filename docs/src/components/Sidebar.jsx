import React from 'react';
import * as Icons from 'lucide-react';
import { diagrams } from '../diagrams/diagramData';

export default function Sidebar({ activeId, onSelect, searchQuery, setSearchQuery }) {
  const filtered = diagrams.filter(d => d.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <Icons.Layers className="logo-icon" size={24} />
          <span>HubParking</span>
        </div>
      </div>
      
      <div className="search-container">
        <Icons.Search className="search-icon" size={16} />
        <input 
          type="text" 
          placeholder="Search diagrams..." 
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </div>

      <nav className="sidebar-nav">
        {filtered.map(diagram => {
          const IconComponent = Icons[diagram.icon] || Icons.Box;
          return (
            <a 
              key={diagram.id}
              href="#" 
              className={`nav-item ${diagram.id === activeId ? 'active' : ''}`}
              onClick={(e) => {
                e.preventDefault();
                onSelect(diagram.id);
              }}
            >
              <IconComponent size={18} className="nav-icon" />
              <span className="nav-title">{diagram.title}</span>
            </a>
          );
        })}
      </nav>

      <div className="sidebar-footer">
        {diagrams.length - 1} diagrams
      </div>
    </aside>
  );
}
