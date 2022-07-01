import { createEntry } from '../api/entries';
import { useMutation } from 'react-query';

const useCreateEntries = useMutation((entry) => createEntry(entry), {
  onError: () => {
    // not sure what to place here but will most likely need something
  },
  onSuccess: () => {
    // invalidate all queries for data
    // overview, monthly, weekly, shift
  },
});

export default useCreateEntries;
