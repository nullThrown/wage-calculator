import { useQuery } from 'react-query';
import { getUser } from 'features/user/api/user';

const useGetUser = () => useQuery(['user'], () => getUser());

export default useGetUser;
