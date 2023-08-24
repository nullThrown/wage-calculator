import SignupForm from 'features/auth/components/SignupForm';
import FormContainer from 'components/base/FormContainer';
import TwoColumnLayout from 'components/layout/TwoColumnLayout';

const Signup = () => {
  return (
    <TwoColumnLayout>
      <FormContainer>
        <SignupForm />
      </FormContainer>
    </TwoColumnLayout>
  );
};

export default Signup;
