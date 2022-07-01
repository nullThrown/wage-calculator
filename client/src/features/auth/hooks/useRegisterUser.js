import { useMutation } from 'react-query';
import { registerUser } from '../api/auth';

const useRegisterUser = useMutation((user) => registerUser(user));
// useRegisterUSer instance should handle the UI logic
// error/success states, redirects etc.

export default useRegisterUser;
