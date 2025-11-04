import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../style/ReportsPage.css';

export default function ReportForm() {
  const navigate = useNavigate();
  const [reportType, setReportType] = useState('transactions');
  const [fileFormat, setFileFormat] = useState('PDF');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState(new Date().toISOString().split('T')[0]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!startDate || !endDate) {
      setError('Debes seleccionar un rango de fechas válido.');
      setMessage('');
      return;
    }
    
    setError('');
    setMessage('');
    setIsLoading(true);

    const clientId = localStorage.getItem('clientId');
    if (!clientId) {
        setError('No se encontró tu ID de cliente. Por favor, inicia sesión de nuevo.');
        setIsLoading(false);
        navigate('/login');
        return;
    }

    const apiUrl = `${import.meta.env.VITE_API_ENDPOINT}api/reports/`;

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          report_type: reportType,
          file_format: fileFormat,
          start_date: startDate,
          end_date: endDate,
          client_id: clientId 
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const errorMsg = data.detail || data.error || 'Ocurrió un error.';
        throw new Error(errorMsg);
      }
      
      setMessage(data.message); 

    } catch (err) {
      console.error('Error en handleSubmit:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
        {message && <span className="success-message">{message}</span>}

        <div className="reports-actions">
          <button type="submit" className="btn btn-primary" disabled={isLoading}>
            {isLoading ? (
              <i className="fi fi-rr-spinner fi-spin"></i> 
            ) : (
              <i className="fi fi-rr-download"></i>
            )}
            {isLoading ? 'Generando...' : 'Generar Reporte'}
          </button>
        </div>
      </form>
    </div>
  );
}