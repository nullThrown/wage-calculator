import filterEntriesByDate from './filterEntriesByDate';
import convertFromDecimalTime from 'util/convertFromDecimalTime';

const initialEntryFormState = {
  hoursWorked: 0,
  minutesWorked: 0,
  totalSales: 0,
  creditTips: 0,
  cashTips: 0,
  tipOut: 0,
  shiftTime: 'morning',
  companyId: null,
  specialEvent: false,
  totalSalesApplicable: false,
  shiftDate: new Date(),
};
export const initialState = {
  selectedDate: new Date(),
  selectedEntryId: null,
  filteredEntries: [],
  isEditMode: false,
  entryFormData: initialEntryFormState,
};

export const entryFormReducer = (state, action) => {
  switch (action.type) {
    // edit form
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

    case 'set_to_edit_mode':
      const selectedEntry = state.filteredEntries.find(
        (entry) => entry._id === state.selectedEntryId
      );
      const { hours, minutes } = convertFromDecimalTime(
        selectedEntry.timeWorkedDec
      );
      return {
        ...state,
        isEditMode: true,
        entryFormData: {
          ...selectedEntry,
          minutesWorked: minutes,
          hoursWorked: hours,
        },
      };

    case 'reset_all_state':
      return initialState;

    case 'reset_edit_mode':
      return { ...initialState, entryFormData: state.entryFormData };

    // normal form actions
    case 'init_entry_form':
      return {
        ...state,
        entryFormData: {
          ...state.entryFormData,
          companyId: action.selectedCompanyId,
        },
      };
    case 'set_total_sales_applicable':
      return {
        ...state,
        entryFormData: {
          ...state.entryFormData,
          totalSalesApplicable: action.companyTotalSalesApplicable,
        },
      };

    case 'set_shift_date':
      return {
        ...state,
        entryFormData: { ...state.entryFormData, shiftDate: action.shiftDate },
      };
    case 'set_form_data':
      // the first argument of the Chakra UI's onChange callback varies based on input type
      const { firstArg, name } = action;
      if (typeof firstArg === 'object') {
        return {
          ...state,
          entryFormData: {
            ...state.entryFormData,
            [firstArg.target.name]: firstArg.target.value,
          },
        };
      } else {
        return {
          ...state,
          entryFormData: {
            ...state.entryFormData,
            [name]: firstArg,
          },
        };
      }
  }
  throw Error('Unknown action: ' + action.type);
};
