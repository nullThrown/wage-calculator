import { useMutation } from 'react-query';
import { setCompanyRemovedStatus } from '../api/user';

const useSetCompanyRemovedStatus = (companyID, status) =>
  useMutation(() => setCompanyRemovedStatus({ companyID, status }));
// invalidate user query

export default useSetCompanyRemovedStatus;
