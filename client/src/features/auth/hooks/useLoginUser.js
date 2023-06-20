import { useMutation } from 'react-query';
import { loginUser } from '../api/auth';

const useLoginUser = () => useMutation((user) => loginUser(user));

export default useLoginUser;
