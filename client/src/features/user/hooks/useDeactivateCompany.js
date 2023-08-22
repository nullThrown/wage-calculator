import { useMutation } from 'react-query';
import { updateCompanyActiveStatus } from '../api/user';

const useDeactivateCompany = () => {
  return useMutation((data) => updateCompanyActiveStatus(data));
};

export default useDeactivateCompany;
