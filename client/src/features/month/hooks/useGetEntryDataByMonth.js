import { useQuery } from 'react-query';
import { getEntryDataByMonth } from '../api/month';

const useGetEntryDataByMonth = (month, year, filter) =>
  useQuery(
    ['entries', 'data', month, year, filter],
    getEntryDataByMonth(year, month, filter)
  );

export default useGetEntryDataByMonth;
