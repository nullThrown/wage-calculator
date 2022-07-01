import { useMutation } from 'react-query';
import { loginUser } from '../api/auth';

const useLoginUser = useMutation((user) => loginUser(user));
// useRegisterUSer instance should handle the UI logic
// error/success states, redirects etc.

export default useLoginUser;
