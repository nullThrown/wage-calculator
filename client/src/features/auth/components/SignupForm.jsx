import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Button, Spinner } from '@chakra-ui/react';
import CenterContainer from 'components/base/CenterContainer';
import MainHeading from 'components/typography/MainHeading';
import SmallCard from 'components/card/SmallCard';
import useRegisterUser from 'features/auth/hooks/useRegisterUser';
import useSignupValidation from 'features/auth/hooks/useSignupVal';
import ErrorText from 'components/typography/ErrorText';
import TextInput from 'components/form/TextInput';

const SignupForm = () => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [displayErrors, setDisplayErrors] = useState(false);
  const [serverError, setServerError] = useState(null);

  const registerUser = useRegisterUser(user);
  const { emailError, usernameError, passwordError, setEmailError } =
    useSignupValidation(user);
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUser(() => {
      return { ...user, [e.target.name]: e.target.value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (emailError || usernameError || passwordError) {
      return setDisplayErrors(true);
    }

    return registerUser.mutate(user, {
      onSuccess: (data, variables, context) => {
        navigate('/signup-success');
      },
      onError: (error, variables, context) => {
        console.log(error.message);
        const { message } = error;
        // simplify this
        setServerError(() => {
          if (message === 'connection_error' || message === 'server_error') {
            return true;
          } else {
            return false;
          }
        });
        setEmailError(() => message === 'email_already_exists');
      },
    });
  };

  if (registerUser.isLoading) {
    return (
      <CenterContainer>
        <Spinner size='lg' color='teal.500' />
      </CenterContainer>
    );
  }
  return (
    <CenterContainer>
      <SmallCard as='form'>
        <MainHeading size='2xl' textAlign='center'>
          Sign Up
        </MainHeading>

        <Flex flexDirection='column'>
          <TextInput
            title='Email'
            name='email'
            type='email'
            value={user.email}
            onChange={handleInputChange}
            isInvalid={emailError & displayErrors}
            errorMsg='Email is either invalid or in use'
          />
          <TextInput
            title='Username'
            name='username'
            value={user.username}
            onChange={handleInputChange}
            isInvalid={usernameError & displayErrors}
            errorMsg='Must have a username'
          />

          <TextInput
            title='password'
            name='password'
            type='password'
            value={user.password}
            onChange={handleInputChange}
            isInvalid={passwordError & displayErrors}
            errorMsg='Password must be at least 8 characters'
            helperText={
              passwordError & displayErrors
                ? null
                : 'Password must be at least 8 characters'
            }
          />
        </Flex>
        {serverError && (
          <ErrorText m='10px 0'>
            Something went wrong :( please try again
          </ErrorText>
        )}
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
      </SmallCard>
    </CenterContainer>
  );
};

export default SignupForm;
