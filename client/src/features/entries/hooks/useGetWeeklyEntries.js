import { useQuery } from 'react-query';
import { getEntriesByWeek } from '../api/entries';

const useGetEntriesByWeek = (date, filter) => {
  return useQuery(['entries', date, filter], () =>
    getEntriesByWeek(date, filter)
  );
};

export default useGetEntriesByWeek;
