import React from 'react';
import './Dashboard.css';

export default function Dashboard() {
  return (
    <section className="screen active" id="screen-dashboard">
      <div className="kpi-grid">
        <div className="card kpi-card">
          <div className="kpi-ico">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="7" height="16" rx="1.4" stroke="currentColor" strokeWidth="1.8"/><rect x="14" y="4" width="7" height="16" rx="1.4" stroke="currentColor" strokeWidth="1.8"/></svg>
          </div>
          <div className="label">Vagas livres</div>
          <div className="value">128</div>
          <div className="delta up">↑ 6 na última hora</div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-ico">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 16V11l2-5h12l2 5v5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M2 16h20v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
          </div>
          <div className="label">Vagas ocupadas</div>
          <div className="value">312</div>
          <div className="delta flat">70,9% de ocupação</div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-ico">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.8"/><path d="M12 7v5l3.5 2" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </div>
          <div className="label">Turno atual</div>
          <div className="value">Diurno</div>
          <div className="delta flat">encerra às 18:00</div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-ico">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M4 8h13a3 3 0 0 1 0 6H7a3 3 0 0 0 0 6h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </div>
          <div className="label">Faturamento hoje</div>
          <div className="value">R$ 4.860</div>
          <div className="delta up">↑ 12% vs. ontem</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card card-pad">
          <div className="card-head">
            <div>
              <h3>Movimentações recentes</h3>
              <div className="hint">Entradas e saídas dos últimos minutos</div>
            </div>
            <button className="btn-secondary btn-sm">Ver todos</button>
          </div>
          <table>
            <thead><tr><th>Placa</th><th>Vaga</th><th>Movimento</th><th>Horário</th><th>Status</th></tr></thead>
            <tbody id="dash-activity-body">
              {/* Vazio temporariamente */}
            </tbody>
          </table>
        </div>

        <div className="card card-pad">
          <div className="card-head"><div><h3>Ocupação por piso</h3><div className="hint">Distribuição atual</div></div></div>
          <div className="donut-wrap">
            <svg width="128" height="128" viewBox="0 0 42 42">
              <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#F3F3F3" strokeWidth="6"></circle>
              <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#17313E" strokeWidth="6" strokeDasharray="38 62" strokeDashoffset="25" strokeLinecap="round"></circle>
              <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#3EC1F4" strokeWidth="6" strokeDasharray="26 74" strokeDashoffset="-13" strokeLinecap="round"></circle>
              <circle cx="21" cy="21" r="15.9" fill="transparent" stroke="#B5F1F5" strokeWidth="6" strokeDasharray="16 84" strokeDashoffset="-39" strokeLinecap="round"></circle>
              <text x="21" y="19" textAnchor="middle" fontFamily="Space Grotesk" fontSize="6" fill="#17313E" fontWeight="700">440</text>
              <text x="21" y="25.5" textAnchor="middle" fontFamily="Inter" fontSize="3.4" fill="#84959c">vagas</text>
            </svg>
            <div className="donut-legend">
              <div><span className="sw" style={{background:'#17313E'}}></span> Térreo <b>92%</b></div>
              <div><span className="sw" style={{background:'#3EC1F4'}}></span> 1º andar <b>63%</b></div>
              <div><span className="sw" style={{background:'#B5F1F5'}}></span> 2º andar <b>38%</b></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
