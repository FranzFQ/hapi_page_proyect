import React from 'react';

export default function StockNews({ news }) {

  const formatDate = (dateString) => {
    const options = { month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('es-ES', options);
  };

  return (
    <div className="stock-news-section glass-effect">
      <h3>Noticias Recientes</h3>
      
      {(!news || news.length === 0) ? (
        <div className="news-list-empty">
          <p>No se encontraron noticias recientes para esta acción.</p>
        </div>
      ) : (
        <div className="news-list">
          {news.map(item => (
            <a 
              key={item.id} 
              href={item.url} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="news-item"
            >
              <span className="news-source">{item.source} - {formatDate(item.published_at)}</span>
              <p className="news-title">{item.title}</p>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}