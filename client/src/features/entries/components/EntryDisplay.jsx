import React from 'react';

const EntryDisplay = ({ entry }) => {
  return (
    <button
      type='button'
      style={{
        width: '96%',
        margin: '2px auto',
        backgroundColor: '#00ff80',
        boxShadow: '1px 1px 5px rgb(240,240,240)',
      }}>
      {entry.position}
    </button>
  );
};

export default EntryDisplay;
