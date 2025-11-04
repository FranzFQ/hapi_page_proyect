import React from 'react';
import SearchBar from './SearchBar';

export default function SearchInputSection({ value, onChange, placeholder }) {
  return (
    <div className="search-input-section">
      <SearchBar 
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}