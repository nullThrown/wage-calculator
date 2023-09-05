import { createEntry } from '../api/entries';
import { useMutation } from 'react-query';
import { useQueryClient } from 'react-query';

const useCreateEntry = () => {
  const queryClient = useQueryClient();

  return useMutation((entry) => createEntry(entry), {
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ['entries'],
      });
    },
  });
};
export default useCreateEntry;
