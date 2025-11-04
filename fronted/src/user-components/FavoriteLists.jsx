import React, { useState } from 'react';
import '../style/FavoriteLists.css';

const FavoriteLists = () => {
  const [favoriteLists, setFavoriteLists] = useState([]);
  const [editingList, setEditingList] = useState(null);
  const [editedName, setEditedName] = useState('');

  const handleDeleteList = (id) => {
    setFavoriteLists((prev) => prev.filter((list) => list.id !== id));
  };

  const handleEditList = (list) => {
    setEditingList(list);
    setEditedName(list.name);
  };

  const handleSaveEdit = () => {
    setFavoriteLists((prev) =>
      prev.map((l) =>
        l.id === editingList.id ? { ...l, name: editedName } : l
      )
    );
    setEditingList(null);
    setEditedName('');
  };

  const handleCancelEdit = () => {
    setEditingList(null);
    setEditedName('');
  };

  return (
    <div className="favorite-lists">
      <h2 className="favorite-lists-title">Listas favoritas</h2>

      {favoriteLists.length === 0 ? (
        <p className="empty-favorites-msg">No tienes listas favoritas</p>
      ) : (
        <div className="favorite-lists-container">
          {favoriteLists.map((list) => (
            <div key={list.id} className="favorite-list-item">
              <div className="favorite-list-info">
                {editingList?.id === list.id ? (
                  <input
                    type="text"
                    className="favorite-list-edit-input"
                    value={editedName}
                    onChange={(e) => setEditedName(e.target.value)}
                    autoFocus
                  />
                ) : (
                  <div>
                    <h3 className="favorite-list-name">{list.name}</h3>
                    <p className="favorite-list-count">
                      {list.activeCount || 0} activos
                    </p>
                  </div>
                )}
              </div>

              <div className="favorite-list-actions">
                {editingList?.id === list.id ? (
                  <>
                    <button className="save-btn" onClick={handleSaveEdit}>
                      <i className="fi fi-rr-check"></i>
                    </button>
                    <button className="cancel-btn" onClick={handleCancelEdit}>
                      <i className="fi fi-rr-cross"></i>
                    </button>
                  </>
                ) : (
                  <>
                    <button
                      className="edit-btn"
                      onClick={() => handleEditList(list)}
                    >
                      <i className="fi fi-rr-settings"></i>
                    </button>
                    <button
                      className="delete-btn"
                      onClick={() => handleDeleteList(list.id)}
                    >
                      <i className="fi fi-rr-trash"></i>
                    </button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoriteLists;
