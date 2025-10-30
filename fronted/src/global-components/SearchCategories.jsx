import React from 'react';
import '../style/SearchPage.css';

export default function SearchCategories({ categories, onCategoryClick }) {
  return (
    <div className="categories-section-search glass-effect">
      <h3 className="section-subtitle">Categorías</h3>
      <div className="categories-grid-search">
        {categories.map((category, index) => (
          <div 
            key={index} 
            className="category-chip"
            onClick={() => onCategoryClick(category)}
          >
            {category}
          </div>
        ))}
      </div>
    </div>
  );
}