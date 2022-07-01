import { useMutation, useQuery } from 'react-query';
import { addCompany } from '../api/user';

const useAddCompany = (company) => useMutation(() => addCompany(company));
// invalidate user query

export default useAddCompany;
