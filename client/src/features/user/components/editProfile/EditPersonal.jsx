import {
  VStack,
  Heading,
  Button,
  useToast,
  Spinner,
  Flex,
} from '@chakra-ui/react';
import TextInput from 'components/form/TextInput';
import { useEffect, useState } from 'react';
import useGetUser from 'features/user/hooks/useGetUser';
import useUpdatePersonal from 'features/user/hooks/useUpdatePersonal';
import { validate } from 'email-validator';
import {
  connection_error,
  email_already_exists,
  invalid_data,
} from 'constants/api/error';
import { successToast, errorToast } from 'components/toast/toast';
const initialErrorValue = { isError: false, type: '', msg: '' };
const EditPersonal = () => {
  const [formData, setFormData] = useState({ email: '', username: '' });

  const [emailError, setEmailError] = useState(initialErrorValue);
  const [usernameError, setUsernameError] = useState(initialErrorValue);

  const { isLoading, isError, user } = useGetUser();
  const updatePersonal = useUpdatePersonal();
  const toast = useToast();

  const handleChange = (e) => {
    setFormData(() => {
      return { ...formData, [e.target.name]: e.target.value };
    });
  };
  const handleSubmit = (e) => {
    const { email, username } = formData;
    e.preventDefault();
    if (!validate(email) || username.length === 0) {
      if (!validate(email)) {
        setEmailError({
          isError: true,
          type: invalid_data,
          msg: 'Email is invalid',
        });
      } else setEmailError(initialErrorValue);
      if (username.length === 0) {
        setUsernameError({
          isError: true,
          type: invalid_data,
          msg: 'Must have a username',
        });
      } else setUsernameError(initialErrorValue);

      return;
    }
    setEmailError(initialErrorValue);
    setUsernameError(initialErrorValue);
    updatePersonal.mutate(formData, {
      onSuccess: () => {
        toast({
          ...successToast,
          title: 'Personal information successfully changed!',
        });
      },
      onError: (error) => {
        const { message } = error;
        if (message === connection_error) toast({ ...errorToast });
        if (message === email_already_exists)
          setEmailError({
            isError: true,
            type: email_already_exists,
            msg: 'Email is already in use',
          });
      },
    });
  };
  useEffect(() => {
    if (user) setFormData({ email: user.email, username: user.username });
  }, [user]);

  if (updatePersonal.isLoading) {
    return (
      <Flex w='20rem' justify='center' align='center'>
        <Spinner />
      </Flex>
    );
  }
  return (
    <VStack as='form' w='20rem' mb='2em' spacing='1em'>
      <Heading
        as='h2'
        size='md'
        fontWeight='500'
        opacity='.7'
        alignSelf='start'
        mb='1em'>
        Edit Personal
      </Heading>
      <TextInput
        title='Email'
        name='email'
        value={formData.email}
        onChange={handleChange}
        isInvalid={
          emailError.type === invalid_data ||
          emailError.type === email_already_exists
        }
        errorMsg={emailError.msg}
      />
      <TextInput
        title='Username'
        name='username'
        value={formData.username}
        onChange={handleChange}
        isInvalid={usernameError.type === invalid_data}
        errorMsg={usernameError.msg}
      />
      <Button
        type='submit'
        size='sm'
        colorScheme='facebook'
        mt='1em'
        onClick={handleSubmit}>
        Save Profile
      </Button>
    </VStack>
  );
};

export default EditPersonal;
