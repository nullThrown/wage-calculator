import { useQuery } from 'react-query';
import { getOverviewData } from '../api/overview';

const useGetOverViewData = (filter) =>
  useQuery(['entries', 'data', filter], () => {
    getOverviewData(filter);
  });

export default useGetOverViewData;
