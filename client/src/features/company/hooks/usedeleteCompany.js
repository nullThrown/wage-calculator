import { useMutation } from 'react-query';
import { deleteCompany } from '../../company/api/company';

const useDeleteCompany = (_id) => {
  return useMutation((_id) => deleteCompany(_id));
  // invalidate user query
};

export default useDeleteCompany;
