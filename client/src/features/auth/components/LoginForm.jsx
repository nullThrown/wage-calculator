import React, { useState } from 'react';
import { Heading, Flex, Container, Box, Image } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
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
  msg: null,
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
            msg: 'Invalid credentials',
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
    <>
      <Heading
        as='h1'
        size='xl'
        textAlign='center'
        fontWeight='400'
        color='#20499C'>
        Login
      </Heading>
      {error.isError && <ErrorText>{error.msg}</ErrorText>}
      <Flex
        m={['1.4em auto 0', '1.8em auto 0', '1.8em 0 0']}
        w={['92%', '74%', '100%']}
        flexDirection={['column', 'column', 'row']}
        alignItems='center'
        gap={['3.2em', '3.2em', '.8em']}>
        <Box
          as='form'
          width='100%'
          alignSelf='flex-end'
          order={[1, 1, 0]}
          borderBottom='2px solid #20499C'>
          <Flex flexDirection='column' gap='.8em'>
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
          </Flex>
          <Flex justifyContent='center' m='2em 0 1em'>
            <LoginBtn
              isLoading={loginUser.isLoading}
              handleSubmit={handleSubmit}
            />
          </Flex>
        </Box>
        <Box
          as='figure'
          alignSelf={['auto', 'auto', 'flex-end']}
          w={['90%', '90%', '100%']}>
          <Image src='svg/man-opens-door.svg' />
        </Box>
      </Flex>
    </>
  );
};
export default LoginForm;
