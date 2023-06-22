import { useMutation } from 'react-query';
import { loginUser } from '../api/auth';
import storage from 'util/storage';

const useLoginUser = () =>
  useMutation((user) => loginUser(user), {
    onSuccess: (data, error, context) => {
      storage.setToken(data.token);
    },
    onError: (error, data, context) => {},
  });

export default useLoginUser;
