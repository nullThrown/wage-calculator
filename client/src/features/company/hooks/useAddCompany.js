import { useMutation, useQuery } from 'react-query';
import { addCompany } from 'features/company/api/company';

const useAddCompany = () => useMutation((company) => addCompany(company));
// invalidate user query

export default useAddCompany;
