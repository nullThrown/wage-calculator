import { useQuery } from 'react-query';
import { getUser } from '../api/user';

const useGetUser = () => useQuery(['user'], () => getUser());

export default useGetUser;
