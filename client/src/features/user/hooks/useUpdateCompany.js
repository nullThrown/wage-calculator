import { useMutation } from 'react-query';
import { updateCompany } from '../api/user';

const useUpdateCompany = (company) => useMutation(() => updateCompany(company));
// invalidate user query

export default useUpdateCompany;
