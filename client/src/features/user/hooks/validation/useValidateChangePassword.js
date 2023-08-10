import { useState } from 'react';

export const initNewPassIsSame = {
  isError: false,
  msg: 'New Password must be different than the previous one',
};
export const initPassLengthError = {
  isError: false,
  msg: 'Password must be at least 8 characters',
};
export const initPassMatchError = {
  isError: false,
  msg: 'New Password and confirm password fields must be equal',
};
export const initIncorrectPassError = {
  isError: false,
  msg: 'Password is incorrect',
};
export const useValidateChangePassword = () => {
  const [incorrectPassError, setIncorrectPassError] = useState(
    initIncorrectPassError
  );
  const [passLengthError, setPassLengthError] = useState(initPassLengthError);
  const [passMatchError, setPassMatchError] = useState(initPassMatchError);
  const [newPassIsSameError, setNewPassIsSameError] =
    useState(initNewPassIsSame);

  const resetState = () => {
    setIncorrectPassError({ ...initIncorrectPassError, isError: false });
    setPassLengthError({ ...initPassLengthError, isError: false });
    setPassMatchError({ ...initPassMatchError, isError: false });
    setNewPassIsSameError({ ...initNewPassIsSame, isError: false });
  };
  return {
    incorrectPassError,
    passLengthError,
    passMatchError,
    newPassIsSameError,
    setIncorrectPassError,
    setPassLengthError,
    setPassMatchError,
    setNewPassIsSameError,
    resetState,
  };
};
