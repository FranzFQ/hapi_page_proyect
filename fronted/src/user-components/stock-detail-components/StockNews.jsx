import React from 'react';

export default function StockNews({ news }) {

  if (!news || news.length === 0) {
    return null; 
  }

  return (
    <div className="stock-news-section glass-effect">
      <h3>Noticias Recientes</h3>
      <div className="news-list">
        {news.map(item => (
          <a 
            key={item.id} 
            href={item.url} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="news-item"
          >
            <span className="news-source">{item.source} - {item.date}</span>
            <p className="news-title">{item.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
}