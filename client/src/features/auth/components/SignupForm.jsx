import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, useToast, Box, Image, Heading } from '@chakra-ui/react';
import useRegisterUser from 'features/auth/hooks/useRegisterUser';
import useSignupValidation from 'features/auth/hooks/useValidateSignup';
import TextInput from 'components/form/TextInput';
import SignupBtn from 'components/button/SignupBtn';
import SignupSuccess from 'pages/protected/SignupSuccess';

import {
  connection_error,
  email_already_exists,
  server_error,
  invalid_data,
} from 'constants/api/error';
import { errorToast } from 'components/toast/toast';

const SignupForm = () => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [displayErrors, setDisplayErrors] = useState(false);

  const toast = useToast();
  const { emailError, usernameError, passwordError, setEmailError } =
    useSignupValidation(user);
  const { isLoading, isIdle, isSuccess, isError, mutate } =
    useRegisterUser(user);

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

    return mutate(user, {
      onError: (error, variables, context) => {
        const { message } = error;
        console.log(message);
        if (message === email_already_exists || invalid_data) {
          setEmailError(true);
          setDisplayErrors(true);
        } else if (message === server_error || message === connection_error) {
          toast({ ...errorToast });
        }
      },
    });
  };

  if (isLoading || isSuccess) {
    return <SignupSuccess isSuccess={isSuccess} />;
  }
  if (isIdle || isError) {
    return (
      <>
        <Heading
          as='h1'
          size='xl'
          textAlign='center'
          fontWeight='400'
          color='#20499C'>
          Sign Up
        </Heading>
        <Flex
          m={['1.4em auto 0', '1.8em auto 0', '1.8em 0 0']}
          w={['92%', '74%', '100%']}
          flexDirection={['column', 'column', 'row']}
          alignItems='center'
          gap={['3.2em', '3.2em', '.8em']}>
          <Box
            as='form'
            width='100%'
            order={[1, 1, 0]}
            borderBottom='2px solid #20499C'>
            <Flex flexDirection='column' gap='.8em'>
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
            <Flex justify='center' m='2em 0 1em'>
              <SignupBtn isLoading={isLoading} handleSubmit={handleSubmit} />
            </Flex>
          </Box>
          <Box as='figure' w={['90%', '90%', '100%']}>
            <Image src='svg/welcome-cats.svg' />
          </Box>
        </Flex>
      </>
    );
  }
};

export default SignupForm;
