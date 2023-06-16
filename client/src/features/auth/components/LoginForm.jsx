import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Heading,
  Button,
  Flex,
  Box,
} from '@chakra-ui/react';
import CenterContainer from 'components/base/CenterContainer';
import ErrorText from 'components/typography/ErrorText';
import { useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser } from 'features/auth/api/auth';
import storage from 'util/storage';
import SmallCard from 'components/card/SmallCard';
import TextInput from 'components/form/TextInput';

export const LoginForm = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    email: '',
    password: '',
  });
  const mutation = useMutation(
    (user) => {
      return loginUser(user);
    },
    {
      onError: (error, variables, context) => {
        console.log('mutation was failure:', error);
      },
      onSuccess: (data, variables, context) => {
        storage.setToken(data.data.token);
        navigate('/home');
      },
    }
  );
  const handleInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
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
          isInvalid={mutation.isError}
          errorMsg={'something went wrong :('}
        />
        <TextInput
          title='Password'
          name='password'
          type='password'
          onChange={handleInputChange}
          isInvalid={mutation.isError}
        />

        {/* <Box mt='.5em'>
          {mutation.isError && <ErrorText>There was a error : (</ErrorText>}
        </Box> */}
        <Flex justifyContent='center' mt='1em'>
          <Button
            type='submit'
            variant='outline'
            color='black'
            colorScheme='blackAlpha'
            isLoading={mutation.isLoading}
            onClick={() => {
              mutation.mutate(user);
            }}>
            Login
          </Button>
        </Flex>
      </SmallCard>
    </CenterContainer>
  );
};
export default LoginForm;
