import React from 'react';
import SignupForm from 'features/auth/components/SignupForm';
import MainWrapper from 'components/base/MainWrapper';
import Footer from 'components/base/Footer';
import FormContainer from 'components/base/FormContainer';
const Signup = () => {
  return (
    <MainWrapper>
      <FormContainer>
        <SignupForm />
      </FormContainer>
      <Footer />
    </MainWrapper>
  );
};

export default Signup;
