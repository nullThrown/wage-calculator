import { VStack, Heading, Button, useToast } from '@chakra-ui/react';
import TextInput from 'components/form/TextInput';
import { useState } from 'react';
import useUpdatePassword from 'features/user/hooks/useUpdatePassword';
import { errorToast, successToast } from 'components/toast/toast';
import {
  invalid_credentials,
  invalid_data,
  server_error,
} from 'constants/api/error';
import ErrorText from 'components/typography/ErrorText';
import {
  useValidateChangePassword,
  initNewPassIsSame,
  initPassLengthError,
  initPassMatchError,
  initIncorrectPassError,
} from 'features/user/hooks/validation/useValidateChangePassword';

const initPasswordValue = {
  currentPassword: '',
  newPassword: '',
  confirmPassword: '',
};

const ChangePassword = () => {
  const [password, setPassword] = useState(initPasswordValue);

  const updatePassword = useUpdatePassword();
  const {
    incorrectPassError,
    passLengthError,
    passMatchError,
    newPassIsSameError,
    setIncorrectPassError,
    setPassLengthError,
    setPassMatchError,
    setNewPassIsSameError,
    resetState,
  } = useValidateChangePassword();
  const toast = useToast();

  const handleChange = (e) => {
    setPassword({ ...password, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    resetState();
    const { newPassword, confirmPassword } = password;
    e.preventDefault();
    if (newPassword.length < 8) {
      setPassLengthError({ ...initPassLengthError, isError: true });
      return;
    }
    if (newPassword !== confirmPassword) {
      setPassMatchError({ ...initPassMatchError, isError: true });
      return;
    }
    updatePassword.mutate(password, {
      onSuccess: () => {
        toast({ ...successToast, title: 'Password updated successfully!' });
        setPassword(initPasswordValue);
      },
      onError: (error) => {
        const { message } = error;
        console.log(error);
        if (message === invalid_credentials) {
          setIncorrectPassError({ ...initIncorrectPassError, isError: true });
        }

        if (message === invalid_data) {
          setNewPassIsSameError({ ...initNewPassIsSame, isError: true });
        }
        if (message === server_error) toast(errorToast);
      },
    });
  };
  return (
    <VStack as='form' display='Flex' w='20rem'>
      <Heading
        as='h2'
        size='md'
        fontWeight='500'
        alignSelf='start'
        opacity='.7'
        mb='1em'>
        Change Password
      </Heading>
      {newPassIsSameError.isError && (
        <ErrorText>{newPassIsSameError.msg}</ErrorText>
      )}
      <TextInput
        type='password'
        title='Current Password'
        name='currentPassword'
        value={password.currentPassword}
        onChange={handleChange}
        isInvalid={incorrectPassError.isError}
        errorMsg={incorrectPassError.msg}
      />
      <TextInput
        type='password'
        title='newPassword'
        name='newPassword'
        value={password.newPassword}
        onChange={handleChange}
        helperText={
          passLengthError.isError
            ? null
            : 'Password must be at least 8 characters'
        }
        isInvalid={passLengthError.isError}
        errorMsg={passLengthError.msg}
      />
      <TextInput
        type='password'
        title='Confirm Password'
        name='confirmPassword'
        value={password.confirmPassword}
        onChange={handleChange}
        isInvalid={passMatchError.isError}
        errorMsg={passMatchError.msg}
      />
      <Button
        type='submit'
        size='sm'
        isLoading={updatePassword.isLoading}
        colorScheme='blackAlpha'
        onClick={handleSubmit}>
        Save Password
      </Button>
    </VStack>
  );
};

export default ChangePassword;
