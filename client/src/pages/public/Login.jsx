import LoginForm from 'features/auth/components/LoginForm';
import FormContainer from 'components/base/FormContainer';
import TwoColumnLayout from 'components/layout/TwoColumnLayout';

const Login = () => {
  return (
    <TwoColumnLayout>
      <FormContainer>
        <LoginForm />
      </FormContainer>
    </TwoColumnLayout>
  );
};

export default Login;
