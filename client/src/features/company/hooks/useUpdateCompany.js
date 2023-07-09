import { useMutation } from 'react-query';
import { updateCompany } from '../../company/api/company';

const useUpdateCompany = (updatedCompany) =>
  useMutation((updatedCompany) => updateCompany(updatedCompany));
// invalidate user query

export default useUpdateCompany;
