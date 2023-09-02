import filterEntriesByDate from './filterEntriesByDate';

export const initialState = {
  selectedDate: new Date(),
  selectedEntryId: null,
  filteredEntries: [],
};

export const entryFormReducer = (state, action) => {
  const { type } = action;
  switch (type) {
    case 'change_date':
      const { newDate, entries } = action;
      const filteredEntries = filterEntriesByDate(entries, newDate);
      return {
        ...state,
        selectedDate: newDate,
        selectedEntryId: null,
        filteredEntries: filteredEntries,
      };
    case 'select_entry':
      return {
        ...state,
        selectedEntryId: action.id,
      };
    case 'send_entry_to_Form':
      break;
  }
  throw Error('Unknown action: ' + action.type);
};
