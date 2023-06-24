import { useMutation, useQuery } from 'react-query';
import { addCompany } from 'features/user/api/user';

const useAddCompany = () => useMutation((company) => addCompany(company));
// invalidate user query

export default useAddCompany;
