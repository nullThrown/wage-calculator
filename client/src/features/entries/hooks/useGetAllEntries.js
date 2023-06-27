import { useQuery } from 'react-query';
import { getAllEntries } from '../api/entries';

const useGetAllEntries = (filter) => {
  const { isLoading, isError, data } = useQuery(
    ['entries', { filter: filter }],
    () => getAllEntries(filter)
  );
  return { isLoading, isError, data };
};
export default useGetAllEntries;
