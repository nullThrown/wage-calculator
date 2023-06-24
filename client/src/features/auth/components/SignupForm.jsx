import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, useToast } from '@chakra-ui/react';
import CenterContainer from 'components/base/CenterContainer';
import MainHeading from 'components/typography/MainHeading';
import SmallCard from 'components/card/SmallCard';
import useRegisterUser from 'features/auth/hooks/useRegisterUser';
import useSignupValidation from 'features/auth/hooks/useSignupVal';
import TextInput from 'components/form/TextInput';
import SignupBtn from 'components/button/SignupBtn';
import {
  connection_error,
  email_already_exists,
  server_error,
} from 'constants/api/error';
import { errorToast } from 'components/toast/toast';

const SignupForm = () => {
  const [user, setUser] = useState({
    email: '',
    username: '',
    password: '',
  });
  const [displayErrors, setDisplayErrors] = useState(false);

  const navigate = useNavigate();
  const toast = useToast();
  const { emailError, usernameError, passwordError, setEmailError } =
    useSignupValidation(user);
  const registerUser = useRegisterUser(user);

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
        const { message } = error;
        if (message === email_already_exists) {
          setEmailError(true);
        } else if (message === server_error || message === connection_error) {
          toast({ ...errorToast });
        }
      },
    });
  };

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
        <SignupBtn
          isLoading={registerUser.isLoading}
          handleSubmit={handleSubmit}
        />
      </SmallCard>
    </CenterContainer>
  );
};

export default SignupForm;
