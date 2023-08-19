import { useQueryClient } from 'react-query';
import storage from 'services/storage';
import { useNavigate } from 'react-router-dom';

// function works
// token is removed✔
// quieryClient cache is cleared✔
// navigation is successful✔
// however, react does not register that there is no user
// therefore navigation return back to home page as it believes
// there is "still a user"
const useSignoutUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const signout = () => {
    storage.removeToken();
    queryClient.removeQueries();
    navigate('/');
  };

  return { signout };
};

export default useSignoutUser;
