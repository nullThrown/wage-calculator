import { useQuery } from 'react-query';
import { getEntriesByWeek } from '../api/entries';

const useGetEntriesByWeek = (filter, date) => {
  return useQuery(['entries', filter, date], () =>
    getEntriesByWeek(filter, date)
  );
};

export default useGetEntriesByWeek;
