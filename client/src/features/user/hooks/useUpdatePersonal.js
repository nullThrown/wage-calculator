import { useMutation, useQueryClient } from 'react-query';
import { updatePersonal } from '../api/user';

const useUpdatePersonal = (personalInfo) => {
  const queryClient = useQueryClient();
  console.log(personalInfo);
  return useMutation((personalInfo) => updatePersonal(personalInfo), {
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['user'] }),
  });
};

export default useUpdatePersonal;
