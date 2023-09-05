import { updateEntry } from '../api/entries';
import { useMutation, useQueryClient } from 'react-query';

const useUpdateEntry = () => {
  const queryClient = useQueryClient();

  return useMutation((updatedEntry) => updateEntry(updatedEntry), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['entries'],
      });
    },
  });
};

export default useUpdateEntry;
