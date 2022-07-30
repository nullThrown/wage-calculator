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
import ErrorMsg from 'components/typography/ErrorMsg';
import { useQuery, useMutation } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { loginUser } from 'features/auth/api/auth';
import storage from 'util/storage';

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
      onError: (data, variables, context) => {
        console.log('mutation was failure:', data);
      },
      onSuccess: (data, variables, context) => {
        storage.setToken(data.data.token);
        navigate('/home');
      },
    }
  );
  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    // <Flex justify='center' height='100vh' mt='10em'>
    <CenterContainer>
      <FormControl
        as='form'
        boxShadow='2px 2px 10px rgba(0,0,0, .2)'
        maxW='540px'
        width='96%'
        padding='2em 4em'
        alignSelf='start'>
        <Heading size='lg' fontWeight='400' textAlign='center' color='teal.900'>
          Login
        </Heading>
        <FormLabel htmlFor='email' color='teal'>
          email
        </FormLabel>
        <Input id='email' type='email' name='email' onChange={onInputChange} />
        <FormLabel htmlFor='password' mt='1em' color='teal'>
          Password
        </FormLabel>
        <Input
          id='password'
          type='password'
          name='password'
          onChange={onInputChange}
        />
        <Box mt='.5em'>{mutation.isError && <ErrorMsg msg='' />}</Box>
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
      </FormControl>
    </CenterContainer>
    // </Flex>
  );
};
export default LoginForm;
