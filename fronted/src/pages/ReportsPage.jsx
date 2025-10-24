import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/ReportsPage.css';
import '../style/SettingsPage.css';

export default function ReportsPage() {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState('transactions');
  const [fileFormat, setFileFormat] = useState('PDF');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');

  const setDateRange = (days) => {
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days);
    
    setEndDate(end.toISOString().split('T')[0]);
    setStartDate(start.toISOString().split('T')[0]);
    setError('');
  };

  const setDateYear = () => {
    const end = new Date();
    const start = new Date(end.getFullYear(), 0, 1);
    
    setEndDate(end.toISOString().split('T')[0]);
    setStartDate(start.toISOString().split('T')[0]);
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError('Debes seleccionar un rango de fechas válido.');
      return;
    }
    setError('');
    alert(`Simulación: Generando reporte de ${reportType} en formato ${fileFormat} (Desde ${startDate} hasta ${endDate}). Revisa tu correo.`);
  };

  return (
    <div className="settings-page-background">
      <div className="reports-page-wrapper">
        <div className="reports-container">
          <div className="reports-header">
            <button onClick={() => navigate('/home')} className="back-button" title="Volver a inicio">
              <i className="fi fi-rr-arrow-left"></i>
            </button>
            <div className="header-text">
              <h2>Centro de Reportes</h2>
              <p>Genera reportes detallados de tu actividad y rendimiento.</p>
            </div>
          </div>

          <form className="reports-form" onSubmit={handleSubmit}>
            
            <div className="report-step">
              <h3 className="form-section-title">1. Seleccione el tipo de reporte</h3>
              <div className="report-type-grid">
                <div 
                  className={`report-type-card ${reportType === 'transactions' ? 'selected' : ''}`}
                  onClick={() => setReportType('transactions')}
                >
                  <i className="fi fi-rr-list-check"></i>
                  <span>Historial de Transacciones</span>
                  <small>Todas tus compras y ventas.</small>
                </div>
                <div 
                  className={`report-type-card ${reportType === 'pnl' ? 'selected' : ''}`}
                  onClick={() => setReportType('pnl')}
                >
                  <i className="fi fi-rr-chart-line-up"></i>
                  <span>Ganancias y Pérdidas</span>
                  <small>Rendimiento de tus activos.</small>
                </div>
              </div>
            </div>

            <div className="report-step">
              <h3 className="form-section-title">2. Seleccione el rango de fechas</h3>
              <div className="date-quick-select">
                <button type="button" className="date-quick-btn" onClick={() => setDateRange(30)}>Últimos 30 días</button>
                <button type="button" className="date-quick-btn" onClick={() => setDateRange(90)}>Últimos 90 días</button>
                <button type="button" className="date-quick-btn" onClick={() => setDateYear()}>Año Actual</button>
              </div>
              <div className="date-range-group">
                <div className="form-group-date">
                  <label htmlFor="startDate" className="form-label">Fecha de Inicio</label>
                  <input 
                    type="date" 
                    id="startDate" 
                    className="form-input-date" 
                    value={startDate} 
                    onChange={(e) => setStartDate(e.target.value)} 
                  />
                </div>
                <div className="form-group-date">
                  <label htmlFor="endDate" className="form-label">Fecha de Fin</label>
                  <input 
                    type="date" 
                    id="endDate" 
                    className="form-input-date" 
                    value={endDate} 
                    onChange={(e) => setEndDate(e.target.value)} 
                  />
                </div>
              </div>
            </div>

            <div className="report-step">
              <h3 className="form-section-title">3. Seleccione el formato</h3>
              <div className="format-select-group">
                <label className={`format-radio ${fileFormat === 'PDF' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="format" 
                    value="PDF" 
                    checked={fileFormat === 'PDF'} 
                    onChange={() => setFileFormat('PDF')}
                  />
                  <i className="fi fi-rr-file-pdf"></i>
                  <span>PDF</span>
                </label>
                <label className={`format-radio ${fileFormat === 'CSV' ? 'selected' : ''}`}>
                  <input 
                    type="radio" 
                    name="format" 
                    value="CSV" 
                    checked={fileFormat === 'CSV'} 
                    onChange={() => setFileFormat('CSV')}
                  />
                  <i className="fi fi-rr-file-csv"></i>
                  <span>CSV</span>
                </label>
              </div>
            </div>
            
            {error && <span className="error-message">{error}</span>}

            <div className="reports-actions">
              <button type="submit" className="btn btn-primary">
                <i className="fi fi-rr-download"></i>
                Generar Reporte
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}