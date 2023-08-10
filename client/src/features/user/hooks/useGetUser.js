import { useQuery } from 'react-query';
import { getUser } from 'features/user/api/user';

const useGetUser = () => {
  const { data: user, isLoading, isError } = useQuery(['user'], getUser);

  return { isLoading, isError, user };
};

export default useGetUser;
