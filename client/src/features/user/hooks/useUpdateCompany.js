import { useMutation } from 'react-query';
import { updateCompany } from '../api/user';

const useUpdateCompany = (updatedCompany) =>
  useMutation((updatedCompany) => updateCompany(updatedCompany));
// invalidate user query

export default useUpdateCompany;
