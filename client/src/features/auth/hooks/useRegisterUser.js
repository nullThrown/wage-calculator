import { useMutation } from 'react-query';
import { registerUser } from '../api/auth';
import storage from '../../../services/storage';

function useRegisterUser(user) {
  return useMutation(() => registerUser(user), {
    onError: (error, variables, context) => {},
    onSuccess: (data, variables, context) => {
      storage.setToken(data.token);
    },
  });
}

export default useRegisterUser;
