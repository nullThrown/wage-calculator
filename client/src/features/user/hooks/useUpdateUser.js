import { useMutation, useQuery } from 'react-query';
import { updateUser } from '../api/user';

const useUpdateUser = (user) => useMutation(() => updateUser(user));
// on success invalidate user query

export default useUpdateUser;
