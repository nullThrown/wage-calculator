import { useMutation } from 'react-query';
import { updatePassword } from '../api/user';

const useUpdatePassword = () => {
  return useMutation(({ currentPassword, newPassword }) =>
    updatePassword({ currentPassword, newPassword })
  );
};

export default useUpdatePassword;
