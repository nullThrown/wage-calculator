import { useQuery } from 'react-query';
import { getOverviewData } from '../api/overview';

const useGetOverviewData = (filter) =>
  useQuery(['entries', 'overview', filter], () => getOverviewData(filter));

export default useGetOverviewData;
