import React from 'react';
const currentlySelectedStyle = {
  backgroundColor: '#1F7CB1',
};
const notCurrentlySelectedStyle = {
  backgroundColor: '#FBF2F0',
};
const SelectedEntryBtn = ({ entry, selectedEntry, setSelectedEntry }) => {
  const isSelected = selectedEntry?._id === entry?._id;
  return (
    <button
      onClick={() => setSelectedEntry(entry)}
      type='button'
      style={
        isSelected
          ? { ...currentlySelectedStyle }
          : { ...notCurrentlySelectedStyle }
      }>
      {entry.position}
    </button>
  );
};

export default SelectedEntryBtn;
