import { useQuery } from 'react-query';
import { getEntriesByWeek } from '../api/entries';

const useGetEntriesByWeek = (filter, date) => {
  const { isLoading, isError, data } = useQuery(['entries', filter, date], () =>
    getEntriesByWeek(filter, date)
  );
  return { isLoading, isError, data };
};

export default useGetEntriesByWeek;
