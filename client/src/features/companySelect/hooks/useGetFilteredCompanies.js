import { useQuery } from 'react-query';
import { getUser } from 'features/auth/api/auth';

const useGetFilteredCompanies = (filter) => {
  const { isLoading, isError, data } = useQuery(['user'], getUser);
  let filteredCompanies = [];

  if (filter === 'all') {
    filteredCompanies = data?.companies;
  } else if (filter === 'active') {
    filteredCompanies = data?.companies.filter(
      (company) => company.isActive === true
    );
  } else {
    filteredCompanies = data?.companies.filter(
      (company) => company.name === filter
    );
  }
  return { isLoading, isError, filteredCompanies };
};

export default useGetFilteredCompanies;
