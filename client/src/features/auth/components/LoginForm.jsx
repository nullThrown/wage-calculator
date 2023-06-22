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
export const LoginForm = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const toast = useToast();
  const loginUser = useLoginUser(user);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    return loginUser.mutate(user, {
      onError: (error, variables, context) => {
        const { message } = error;
        switch (message) {
          case invalid_credentials:
            console.log(invalid_credentials);
            break;

          case server_error:
          case connection_error:
            toast({ ...errorToast });
            break;
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
        <TextInput
          title='Email'
          name='email'
          type='email'
          onChange={handleInputChange}
          isInvalid={isValidationError}
          errorMsg={'something went wrong :('}
        />
        <TextInput
          title='Password'
          name='password'
          type='password'
          onChange={handleInputChange}
          isInvalid={isValidationError}
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
