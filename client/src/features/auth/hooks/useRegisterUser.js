import { useMutation } from 'react-query';
import { registerUser } from '../api/auth';
import storage from '../../../util/storage';

// const useRegisterUser = useMutation((user) => registerUser(user));
// useRegisterUSer instance should handle the UI logic
// error/success states, redirects etc.

function useRegisterUser(user) {
  return useMutation(() => registerUser(user), {
    onError: (error, variables, context) => {
      // console.log(error);
    },
    onSuccess: (data, variables, context) => {
      storage.setToken(data.data.token);
    },
  });
}

export default useRegisterUser;
