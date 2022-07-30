import { useState, useEffect } from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  Flex,
  Box,
  Button,
  Spinner,
} from '@chakra-ui/react';
import CenterContainer from 'components/base/CenterContainer';
import MainHeading from 'components/typography/MainHeading';
import useRegisterUser from 'features/auth/hooks/useRegisterUser';
import useSignupValidation from 'features/auth/hooks/useSignupVal';
import ErrorText from 'components/typography/ErrorText';

const SignupForm = () => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [displayErrors, setDisplayErrors] = useState(false);
  const [serverError, setServerError] = useState(false);

  const registerUser = useRegisterUser(user);
  const { emailError, usernameError, passwordError, setEmailError } =
    useSignupValidation(user);

  const changeHandler = (e) => {
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
      onSuccess: (data, variables, context) => {},
      onError: (error, variables, context) => {
        console.log(error.message);
        const { message } = error;
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
      <Box
        as='form'
        maxWidth='600px'
        width='100%'
        borderBottom='1px solid rgb(200,200,200)'
        pb='.5em'>
        <MainHeading size='2xl' textAlign='center'>
          Sign Up
        </MainHeading>

        <Flex flexDirection='column'>
          <FormControl mt='.5em' isInvalid={emailError & displayErrors}>
            <FormLabel htmlFor='email' variant='flushed'>
              Email
            </FormLabel>
            <Input
              type='email'
              id='email'
              name='email'
              value={user.email}
              onChange={changeHandler}
            />
            {emailError & displayErrors ? (
              <FormErrorMessage>
                Email is either invalid or in use.
              </FormErrorMessage>
            ) : null}
          </FormControl>
          <FormControl mt='.5em' isInvalid={usernameError & displayErrors}>
            <FormLabel htmlFor='userName' variant='flushed'>
              Username
            </FormLabel>
            <Input
              type='text'
              id='username'
              name='username'
              value={user.username}
              onChange={changeHandler}
            />
            <FormErrorMessage>Must have a username.</FormErrorMessage>
          </FormControl>
          <FormControl mt='.5em' isInvalid={passwordError & displayErrors}>
            <FormLabel htmlFor='password' variant='flushed'>
              password
            </FormLabel>
            <Input
              type='password'
              id='password'
              name='password'
              value={user.password}
              onChange={changeHandler}
            />
            {/* password error == false & displayErrors == false */}
            {passwordError & displayErrors ? (
              <FormErrorMessage>
                Password must be atleast 8 characters long.
              </FormErrorMessage>
            ) : (
              <FormHelperText>
                Password must be atleast 8 characters long.
              </FormHelperText>
            )}
          </FormControl>
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
      </Box>
    </CenterContainer>
  );
};

export default SignupForm;
