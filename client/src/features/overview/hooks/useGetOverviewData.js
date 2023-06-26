import { useQuery } from 'react-query';
import { getOverviewData } from '../api/overview';

const useGetOverviewData = (filter) => {
  const { isLoading, isError, data } = useQuery(
    ['entries', 'overview', filter],
    () => getOverviewData(filter)
  );
  return { isLoading, isError, data };
};

export default useGetOverviewData;
