import React, { useState } from 'react';
import { Heading, Flex } from '@chakra-ui/react';
import CenterContainer from 'components/base/CenterContainer';
import { useNavigate } from 'react-router-dom';
import storage from 'util/storage';
import SmallCard from 'components/card/SmallCard';
import TextInput from 'components/form/TextInput';
import LoginBtn from 'components/button/LoginBtn';
import useLoginUser from '../hooks/useLoginUser';

export const LoginForm = () => {
  const [user, setUser] = useState({
    email: '',
    password: '',
  });

  const navigate = useNavigate();
  const loginUser = useLoginUser(user);

  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    return loginUser.mutate(user, {
      onError: (error, variables, context) => {
        console.log('mutation was failure:', error);
      },
      onSuccess: (data, variables, context) => {
        storage.setToken(data.data.token);
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
          isInvalid={loginUser.isError}
          errorMsg={'something went wrong :('}
        />
        <TextInput
          title='Password'
          name='password'
          type='password'
          onChange={handleInputChange}
          isInvalid={loginUser.isError}
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
