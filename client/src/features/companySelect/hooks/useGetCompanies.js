import { useQuery } from 'react-query';
import { getUser } from 'features/user/api/user';
const useGetCompanies = () => {
  const { data, isLoading, isError } = useQuery(['user'], getUser);
  const companyList = data?.companies;

  return { isLoading, isError, companyList };
};

export default useGetCompanies;
