import { useMutation } from 'react-query';
import { setCompanyRemovedStatus } from '../api/user';

const useSetCompanyRemovedStatus = (_id) => {
  return useMutation((_id) =>
    setCompanyRemovedStatus({ companyId: _id, isRemoved: true })
  );
  // invalidate user query
};

export default useSetCompanyRemovedStatus;
