import MainWrapper from 'components/base/MainWrapper';
import LoginForm from 'features/auth/components/LoginForm';
import Footer from 'components/base/Footer';
import FormContainer from 'components/base/FormContainer';

const Login = () => {
  return (
    <MainWrapper>
      <FormContainer>
        <LoginForm />
      </FormContainer>
      <Footer />
    </MainWrapper>
  );
};

export default Login;
