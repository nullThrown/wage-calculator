import { useState, useEffect } from 'react';
import { validate } from 'email-validator';

const useSignupValidation = (user) => {
  const { email, username, password } = user;

  const [emailError, setEmailError] = useState(false);
  const [usernameError, setUsernameError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);

  useEffect(() => {
    setEmailError(!validate(email));
  }, [email]);

  useEffect(() => {
    username.length < 1 ? setUsernameError(true) : setUsernameError(false);
  }, [username]);

  useEffect(() => {
    password.length < 8 ? setPasswordError(true) : setPasswordError(false);
  }, [password]);

  return { emailError, usernameError, passwordError, setEmailError };
};

export default useSignupValidation;
