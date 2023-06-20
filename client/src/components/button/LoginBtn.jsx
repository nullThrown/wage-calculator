import { Button } from '@chakra-ui/react';
const LoginBtn = ({ isLoading, handleSubmit }) => {
  return (
    <Button
      type='submit'
      variant='outline'
      color='black'
      colorScheme='blackAlpha'
      isLoading={isLoading}
      onClick={handleSubmit}>
      Login
    </Button>
  );
};

export default LoginBtn;
