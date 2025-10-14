import React, { useState } from 'react';

export default function StockForm({ initialData = {}, isEditing = false, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    symbol: initialData.symbol || '',
    name: initialData.name || '',
    price: initialData.price || '',
    category: initialData.category || '',
    description: initialData.description || '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(form);
  };

  return (
    <div className="stock-form-container">
      <form onSubmit={handleSubmit} className="stock-form fade-in">
        <h2>{isEditing ? 'Editar Acción' : 'Añadir Nueva Acción'}</h2>
        
        <div className="form-group">
          <label>Símbolo (Único)</label>
          <input type="text" name="symbol" value={form.symbol} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Nombre Completo</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>{isEditing ? 'Precio Actual' : 'Precio Inicial'}</label>
          <input type="number" step="0.01" name="price" value={form.price} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Categoría</label>
          <input type="text" name="category" value={form.category} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea name="description" value={form.description} onChange={handleChange} rows="4"></textarea>
        </div>
        <div className="form-group form-group-inline">
          <label>Imagen/Logo</label>
          <button type="button" className="btn-secondary">Exportar</button>
        </div>
        
        <div className="form-actions">
          {onCancel && <button type="button" className="btn-cancel" onClick={onCancel}>Cancelar</button>}
          <button type="submit" className="btn-primary">
            {isEditing ? 'Guardar' : 'Añadir'}
          </button>
        </div>
      </form>
    </div>
  );
}