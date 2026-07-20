import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function VisaoGeral() {
  const { usuario } = useAuth();
  const [modalSaidaOpen, setModalSaidaOpen] = useState(false);
  const [modalReservarOpen, setModalReservarOpen] = useState(false);

  const [timer, setTimer] = useState("00:00:00");
  const [estimate, setEstimate] = useState("R$ 8,00");

  useEffect(() => {
    const entrada = new Date();
    entrada.setHours(8, 41, 0, 0);

    const tick = () => {
      const now = new Date();
      let diff = Math.max(0, now - entrada);
      const h = String(Math.floor(diff / 3600000)).padStart(2, '0');
      const m = String(Math.floor((diff % 3600000) / 60000)).padStart(2, '0');
      const s = String(Math.floor((diff % 60000) / 1000)).padStart(2, '0');
      
      setTimer(`${h}:${m}:${s}`);
      
      const horas = diff / 3600000;
      let valor = 8.00;
      if (horas > 1) {
        valor += Math.ceil(horas - 1) * 5.50;
      }
      setEstimate('R$ ' + valor.toFixed(2).replace('.', ','));
    };

    const interval = setInterval(tick, 1000);
    tick();

    return () => clearInterval(interval);
  }, []);

  const visitas = [
    { data: '14/07', veic: 'BRA2E19', perm: '2h 10min', valor: 'R$ 19,00' },
    { data: '12/07', veic: 'MNC1A88', perm: '0h 45min', valor: 'R$ 8,00' },
    { data: '10/07', veic: 'BRA2E19', perm: '5h 30min', valor: 'R$ 30,50' },
    { data: '08/07', veic: 'BRA2E19', perm: '1h 05min', valor: 'R$ 8,00' },
  ];

  return (
    <section className="screen active" id="screen-visao-geral">
      <div className="greeting">
        <div className="greeting-eyebrow">Minha conta</div>
        <h1>Boa tarde, {usuario?.nome || 'Marcelo'}</h1>
        <p>Aqui está o resumo da sua conta no HubParking hoje, 15 de julho de 2026.</p>
      </div>

      {/* sessao ativa */}
      <div className="session-hero">
        <div>
          <div className="session-status-row"><span className="pulse"></span><span className="status-text">VEÍCULO NO PÁTIO</span></div>
          <h2>BRA2E19 está estacionado</h2>
          <div className="meta-row">
            <div className="meta-item"><div className="k">Vaga</div><div className="v">A-04 · Térreo</div></div>
            <div className="meta-item"><div className="k">Entrada</div><div className="v">08:41</div></div>
            <div className="meta-item"><div className="k">Tarifa</div><div className="v">R$ 8,00 + R$ 5,50/h</div></div>
          </div>
          <div className="session-actions">
            <button className="btn btn-on-dark btn-sm" onClick={() => setModalReservarOpen(true)}>Reservar próxima vaga</button>
            <button className="btn btn-on-dark btn-sm">Ver localização no mapa</button>
          </div>
        </div>
        <div className="session-timer-box">
          <div className="label">Tempo decorrido</div>
          <div className="timer">{timer}</div>
          <div className="estimate">Valor estimado até agora<b>{estimate}</b></div>
          <div className="session-actions" style={{ justifyContent: 'center' }}>
            <button className="btn btn-primary btn-block" onClick={() => setModalSaidaOpen(true)}>Solicitar saída</button>
          </div>
        </div>
      </div>

      {/* kpis */}
      <div className="kpi-grid">
        <div className="card kpi-card">
          <div className="kpi-ico">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 21V7l8-4 8 4v14M9 21v-6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
          </div>
          <div className="label">Plano atual</div>
          <div className="value">Mensalista</div>
          <div className="sub">válido até 04/08/2026</div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-ico">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M4 16V11l2-5h12l2 5v5" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/><path d="M2 16h20v3a1 1 0 0 1-1 1h-2a1 1 0 0 1-1-1v-1H6v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-3Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round"/></svg>
          </div>
          <div className="label">Veículos cadastrados</div>
          <div className="value">2</div>
          <div className="sub">1 no pátio agora</div>
        </div>
        <div className="card kpi-card">
          <div className="kpi-ico">
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M12 2v20M4 8h13a3 3 0 0 1 0 6H7a3 3 0 0 0 0 6h13" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/></svg>
          </div>
          <div className="label">Visitas este mês</div>
          <div className="value">14</div>
          <div className="sub">R$ 186,00 em tarifas avulsas</div>
        </div>
      </div>

      <div className="grid-2">
        <div className="card card-pad">
          <div className="card-head">
            <div><h3>Últimas visitas</h3><div className="hint">Histórico recente de entradas e saídas</div></div>
            <button className="btn btn-secondary btn-sm">Ver faturas</button>
          </div>
          <table>
            <thead><tr><th>Data</th><th>Veículo</th><th>Permanência</th><th>Valor</th></tr></thead>
            <tbody>
              {visitas.map((v, i) => (
                <tr key={i}>
                  <td>{v.data}</td><td className="cell-mono">{v.veic}</td><td>{v.perm}</td><td className="cell-mono">{v.valor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="card plan-card">
          <div className="card-head" style={{ marginBottom: '10px' }}>
            <div><div className="plan-name">Plano Mensalista</div><div className="plan-sub">Ciclo atual</div></div>
            <span className="chip chip-ativo">ativo</span>
          </div>
          <div className="plan-progress">
            <div className="progress-track"><div className="progress-fill" style={{ width: '64%' }}></div></div>
            <div className="row"><span>20 dias utilizados</span><span>11 restantes</span></div>
          </div>
          <div className="plan-price">
            <span className="amount">R$ 280,00</span>
            <span className="period">/ mês · próxima cobrança em 04/08</span>
          </div>
          <button className="btn btn-secondary btn-block" style={{ marginTop: '16px' }}>Gerenciar plano</button>
        </div>
      </div>

      {/* modais */}
      {modalSaidaOpen && (
        <div className="modal-backdrop open" onClick={(e) => e.target.classList.contains('modal-backdrop') && setModalSaidaOpen(false)}>
          <div className="modal">
            <div className="modal-head">
              <div><h3>Solicitar saída</h3><p>Confirme para liberar a cancela na sua saída.</p></div>
              <button className="modal-close" onClick={() => setModalSaidaOpen(false)}>✕</button>
            </div>
            <div className="modal-form">
              <div className="field"><label>Veículo</label><input value="BRA2E19 · Vaga A-04" disabled style={{ background: '#FBFCFC' }} /></div>
              <div className="field"><label>Valor a pagar</label><input value={estimate} disabled style={{ background: '#FBFCFC' }} /></div>
              <div className="field"><label>Forma de pagamento</label>
                <select>
                  <option>Cartão cadastrado · •••• 4412</option>
                  <option>Pix</option>
                  <option>Débito do mensalista</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setModalSaidaOpen(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={() => setModalSaidaOpen(false)}>Confirmar e pagar</button>
            </div>
          </div>
        </div>
      )}

      {modalReservarOpen && (
        <div className="modal-backdrop open" onClick={(e) => e.target.classList.contains('modal-backdrop') && setModalReservarOpen(false)}>
          <div className="modal">
            <div className="modal-head">
              <div><h3>Reservar próxima vaga</h3><p>Garanta uma vaga para sua próxima visita.</p></div>
              <button className="modal-close" onClick={() => setModalReservarOpen(false)}>✕</button>
            </div>
            <div className="modal-form">
              <div className="row-2">
                <div className="field"><label>Data</label><input type="date" defaultValue="2026-07-16" /></div>
                <div className="field"><label>Horário</label><input type="time" defaultValue="09:00" /></div>
              </div>
              <div className="field"><label>Piso preferido</label>
                <select>
                  <option>Térreo</option>
                  <option>1º andar</option>
                  <option>2º andar</option>
                </select>
              </div>
            </div>
            <div className="modal-actions">
              <button className="btn btn-secondary" onClick={() => setModalReservarOpen(false)}>Cancelar</button>
              <button className="btn btn-primary" onClick={() => setModalReservarOpen(false)}>Reservar</button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
