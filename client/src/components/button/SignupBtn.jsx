import { Button } from '@chakra-ui/react';
const SignupBtn = ({ handleSubmit }) => {
  return (
    <Button
      type='submit'
      color='teal.800'
      colorScheme='teal'
      variant='outline'
      display='block'
      m='1.4em auto 0'
      textAlign='center'
      onClick={handleSubmit}>
      Sign Up
    </Button>
  );
};

export default SignupBtn;
