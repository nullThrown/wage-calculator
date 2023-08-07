import { Button } from '@chakra-ui/react';
const SignupBtn = ({ handleSubmit, isLoading }) => {
  return (
    <Button
      type='submit'
      color='teal.800'
      colorScheme='teal'
      variant='outline'
      isLoading={isLoading}
      onClick={handleSubmit}>
      Sign Up
    </Button>
  );
};

export default SignupBtn;
