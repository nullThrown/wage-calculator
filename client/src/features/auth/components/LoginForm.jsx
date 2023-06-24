import React, { useState } from 'react';
import { Heading, Flex } from '@chakra-ui/react';
import CenterContainer from 'components/base/CenterContainer';
import { useNavigate } from 'react-router-dom';
import SmallCard from 'components/card/SmallCard';
import TextInput from 'components/form/TextInput';
import LoginBtn from 'components/button/LoginBtn';
import useLoginUser from '../hooks/useLoginUser';
import { useToast } from '@chakra-ui/react';
import { errorToast } from 'components/toast/toast';
import {
  invalid_credentials,
  connection_error,
  server_error,
} from 'constants/api/error';
import ErrorText from 'components/typography/ErrorText';

const initialErrorValue = {
  isError: false,
  type: null,
  desc: null,
};

export const LoginForm = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState(initialErrorValue);

  const navigate = useNavigate();
  const toast = useToast();
  const loginUser = useLoginUser(user);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (user.email.length === 0 || user.password.length === 0) {
      return;
    }
    return loginUser.mutate(user, {
      onError: (error, variables, context) => {
        const { message } = error;
        if (message === invalid_credentials) {
          setError({
            isError: true,
            type: invalid_credentials,
            desc: 'Invalid credentials',
          });
        } else if (message === server_error || message === connection_error) {
          setError(initialErrorValue);
          toast({ ...errorToast });
        }
      },
      onSuccess: (data, variables, context) => {
        navigate('/home');
      },
    });
  };

  return (
    <CenterContainer>
      <SmallCard as='form'>
        <Heading size='lg' fontWeight='400' textAlign='center' color='teal.900'>
          Login
        </Heading>
        {error.isError && <ErrorText>{error.desc}</ErrorText>}
        <TextInput
          title='Email'
          name='email'
          type='email'
          onChange={handleInputChange}
          isInvalid={error.isError}
        />
        <TextInput
          title='Password'
          name='password'
          type='password'
          onChange={handleInputChange}
          isInvalid={error.isError}
        />

        <Flex justifyContent='center' mt='1em'>
          <LoginBtn
            isLoading={loginUser.isLoading}
            handleSubmit={handleSubmit}
          />
        </Flex>
      </SmallCard>
    </CenterContainer>
  );
};
export default LoginForm;
