import React from 'react';
import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './ClienteLayout.css';

export default function ClienteLayout({ children }) {
  const { usuario } = useAuth();

  return (
    <div className="cliente-layout">
      <nav className="topnav">
        <NavLink to="/cliente/visao-geral" className="brand-mark">
          <span className="dot"></span> HubParking
        </NavLink>
        <div className="tabs">
          <NavLink to="/cliente/visao-geral" className={({ isActive }) => `tab-btn ${isActive ? 'active' : ''}`}>Visão geral</NavLink>
        </div>
        <div className="nav-right">
          <button className="icon-btn" title="Notificações">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
              <path d="M6 10a6 6 0 1 1 12 0c0 4 1.5 5.5 1.5 5.5H4.5S6 14 6 10Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/>
              <path d="M10 19a2 2 0 0 0 4 0" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
            </svg>
            <span className="badge-dot"></span>
          </button>
          <div className="avatar">{usuario?.nome ? usuario.nome.charAt(0).toUpperCase() : 'AB'}</div>
        </div>
      </nav>

      <div className="wrap">
        {children}
      </div>
    </div>
  );
}
