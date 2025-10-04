import React from 'react';
import '../style/UserHome.css';

const CategoriesSection = () => {
  return (
    <div className="categories-section">
      <h2 className="categories-title">CATEGORÍAS</h2>
      <div className="categories-list">
        <div className="category-item">
          <span className="category-name">Acciones</span>
          <span className="category-percentage">+12.5%</span>
        </div>
      </div>
    </div>
  );
};

export default CategoriesSection;
