import { useQuery } from 'react-query';
import { getCompanies } from 'features/user/api/user';

const useGetCompanies = () => {
  const {
    data: companyList,
    isLoading,
    isError,
  } = useQuery(['companies'], getCompanies);

  return { isLoading, isError, companyList };
};

export default useGetCompanies;
