import { createEntry } from '../api/entries';
import { useMutation } from 'react-query';

const useCreateEntry = (entry) =>
  useMutation((entry) => createEntry(entry), {
    onSuccess: () => {
      // invalidate all queries for data
      // overview, monthly, weekly, shift
    },
  });

export default useCreateEntry;
